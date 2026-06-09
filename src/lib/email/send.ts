import { Resend } from 'resend'
import { supabaseAdmin } from '../supabase-admin'
import {
  buildT1AEmail,
  buildT1BEmail,
  buildT2Email,
  buildT3Email,
  buildT4Email,
  buildT5Email,
  buildT6Email
} from './templates'

export type OrderStatus = 'Confirmed' | 'Handcrafting' | 'Quality Check' | 'Shipped' | 'Delivered' | 'Cancelled'

export async function sendOrderEmail(order: any, newStatus: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not found. Skipping email.');
    return;
  }

  // Guard against double sending
  const normalizedStatus = newStatus.toLowerCase();
  const alreadySent = order.email_sent_for_status?.toLowerCase() === normalizedStatus ||
                      (normalizedStatus === 'confirmed' && order.email_sent_for_status?.toLowerCase() === 'order placed') ||
                      (normalizedStatus === 'order placed' && order.email_sent_for_status?.toLowerCase() === 'confirmed');
                      
  if (alreadySent) {
    console.log(`Email already sent for status: ${newStatus}`);
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  
  let html = '';
  let subject = '';

  const customerName = order.customer_name || 'Customer';
  const orderId = order.id.slice(0, 8).toUpperCase();
  const email = order.customer_email;
  
  if (!email) return;

  try {
    switch (normalizedStatus) {
      case 'confirmed':
      case 'order placed': {
        subject = `Order Confirmed: #${orderId}`
        // Determine if it's a custom sign order by checking items
        const hasCustom = order.order_items?.some((item: any) => !!item.custom_details);
        
        if (hasCustom) {
          // Find the first custom item for specs
          const customItem = order.order_items.find((item: any) => !!item.custom_details);
          const details = customItem.custom_details;
          html = buildT1AEmail({
            name: customerName,
            order_id: orderId,
            custom_text: details.text,
            color_name: details.color,
            colorHex: details.colorHex,
            font_name: details.fontName,
            fontFamily: details.fontFamily,
            backing: details.backing || 'Clear Acrylic',
            dimensions: details.dimensions || 'Standard',
            qty: customItem.quantity,
            total: (order.total_amount / 100).toLocaleString('en-IN')
          });
        } else {
          // Build catalog/accessory summary
          let itemsHtml = '';
          order.order_items?.forEach((item: any) => {
            const product = item.products || {};
            const img = product.image_url || 'https://via.placeholder.com/150';
            const price = (item.price_at_purchase / 100).toLocaleString('en-IN');
            itemsHtml += `
            <!-- Start Item -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
              <tr>
                <td width="70" valign="top">
                  <div style="width: 60px; height: 60px; background-color: #1a1a1a; border-radius: 8px; border: 1px solid #333333; overflow: hidden;">
                    <img src="${img}" width="60" height="60" style="display: block; object-fit: cover;">
                  </div>
                </td>
                <td valign="top" style="padding-left: 15px;">
                  <h3 style="margin: 0 0 5px 0; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; color: #ffffff;">
                    ${product.title || 'Product'}
                  </h3>
                  <p style="margin: 0; font-size: 11px; color: #888888; font-family: 'Inter', sans-serif;">
                    Qty: ${item.quantity} &nbsp;&bull;&nbsp; Size: ${item.selected_size || 'Standard'}
                  </p>
                </td>
                <td valign="top" align="right">
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 700; color: #ffffff;">
                    ₹${price}
                  </span>
                </td>
              </tr>
            </table>
            <!-- End Item -->
            `;
          });
          
          html = buildT1BEmail({
            name: customerName,
            order_id: orderId,
            total: (order.total_amount / 100).toLocaleString('en-IN'),
            address: order.shipping_address || 'Shipping Address Not Provided',
            city: order.shipping_city || 'City',
            itemsHtml: itemsHtml
          });
        }
        break;
      }
      
      case 'handcrafting':
        subject = `We're crafting your neon sign, ${customerName}!`
        html = buildT2Email({ name: customerName, order_id: orderId });
        break;
        
      case 'quality check':
        subject = `Your sign is passing quality checks ✅`
        html = buildT3Email({ name: customerName, order_id: orderId });
        break;
        
      case 'shipped':
        subject = `Order Shipped: #${orderId}`
        // Since we don't have carrier details in DB yet, use placeholders or fetch if available
        html = buildT4Email({
          name: customerName,
          order_id: orderId,
          carrier_name: order.carrier_name || 'Standard Shipping',
          tracking_id: order.tracking_id || 'Will be updated shortly',
          tracking_url: order.tracking_url || 'https://www.amxsigns.com/profile',
          eta_date: order.eta_date || '3-5 Business Days'
        });
        break;
        
      case 'delivered':
        subject = `Delivered: Your AMX Sign has arrived!`
        html = buildT5Email({ name: customerName, order_id: orderId });
        break;
        
      case 'cancelled':
        subject = `Order Cancelled: #${orderId}`
        html = buildT6Email({
          name: customerName,
          order_id: orderId,
          refund_amount: (order.total_amount / 100).toLocaleString('en-IN')
        });
        break;
        
      default:
        console.warn(`No email template for status: ${newStatus}`);
        return;
    }

    if (html) {
      await resend.emails.send({
        from: 'AMX Signs <orders@amxsigns.com>',
        to: email,
        subject,
        html,
      });
      
      // Update DB to mark email sent
      const { error } = await supabaseAdmin
        .from('orders')
        .update({ email_sent_for_status: newStatus })
        .eq('id', order.id);
        
      if (error) {
        console.error('Failed to stamp email_sent_for_status', error);
      }
    }
    
  } catch (err) {
    console.error('Error sending status email:', err);
  }
}
