import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendOrderEmail, OrderStatus } from '@/lib/email/send'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()
    const orderId = params.id

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 })
    }

    // 1. Verify admin session (Server-side validation)
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
        },
      }
    )

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is an admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // 2. Fetch full order for the email dispatcher
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (*)
        )
      `)
      .eq('id', orderId)
      .single()

    if (fetchError || !order) {
      console.error('Failed to fetch order', fetchError)
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // 3. Update orders.status in Supabase
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ 
        status,
        status_updated_at: new Date().toISOString()
      })
      .eq('id', orderId)

    if (updateError) {
      console.error('Failed to update status in DB', updateError)
      return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
    }

    // 4. Send Email via Resend
    // Wrap in try-catch so if email fails, status update is still considered successful
    let emailSent = false
    try {
      await sendOrderEmail(order, status as OrderStatus)
      emailSent = true
    } catch (emailErr) {
      console.error('Email dispatch failed:', emailErr)
    }

    return NextResponse.json({ 
      success: true, 
      emailSent,
      customerEmail: order.customer_email
    })

  } catch (error) {
    console.error('Unexpected error in order status update:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
