import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sendOrderEmail } from "@/lib/email/send";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      totalAmount,
      discountAmount,
      couponCode,
      userId,
      items,
    } = body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: "Missing verification fields" }, { status: 400 });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Save order to DB using Service Role to bypass RLS
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        shipping_address: shippingAddress,
        total_amount: totalAmount,
        discount_amount: discountAmount ?? 0,
        coupon_code: couponCode ?? null,
        status: "confirmed",
        payment_status: "paid",
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
        user_id: userId ?? null,
      })
      .select("id")
      .single();

    if (orderError || !order) {
      console.error("Order save failed:", orderError);
      return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
    }

    // Save order items
    if (items && items.length > 0) {
      const orderItems = items.map((item: {
        productId: string;
        quantity: number;
        priceAtPurchase: number;
        selectedSize: string;
        customDetails?: any;
      }) => ({
        order_id: order.id,
        product_id: item.productId,
        quantity: item.quantity,
        price_at_purchase: item.priceAtPurchase,
        selected_size: item.selectedSize,
        custom_details: item.customDetails ?? null,
      }));

      const { error: itemsError } = await supabaseAdmin.from("order_items").insert(orderItems);
      if (itemsError) {
        console.error("Order items save failed:", itemsError);
      }
    }

    // Increment coupon used_count securely
    if (couponCode) {
      await supabaseAdmin.rpc("increment_coupon_used_count", { coupon_code: couponCode });
    }

    // Fetch full order with items and product details for the email dispatcher
    const { data: fullOrder, error: fetchError } = await supabaseAdmin
      .from("orders")
      .select(`
        *,
        order_items (
          *,
          products (
            *
          )
        )
      `)
      .eq("id", order.id)
      .single();

    if (fetchError || !fullOrder) {
      console.error("Failed to fetch full order for confirmation email:", fetchError);
    } else {
      // Send dynamic status email automatically
      try {
        await sendOrderEmail(fullOrder, "Confirmed");
      } catch (emailError) {
        console.error("Failed to send automatic order confirmation email:", emailError);
      }
    }

    return NextResponse.json({ verified: true, orderId: order.id });
  } catch (error: any) {
    console.error("Payment verification failed:", error);
    return NextResponse.json({ error: error?.message || "Verification failed" }, { status: 500 });
  }
}
