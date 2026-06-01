import { Resend } from 'resend';

export async function sendOrderConfirmation(email: string, name: string, orderId: string, total: number) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not found. Skipping email.');
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'AMX Signs <orders@amxsigns.com>',
      to: email,
      subject: `Order Confirmed: #${orderId.slice(0, 8)}`,
      html: `
        <h1>Thank you for your order, ${name}!</h1>
        <p>Your order <strong>#${orderId.slice(0, 8)}</strong> has been received and is being processed.</p>
        <p>Total Amount: <strong>₹${total.toLocaleString()}</strong></p>
        <p>We will notify you once your handcrafted neon sign is dispatched.</p>
        <br/>
        <p>Best regards,<br/>AMX Signs Team</p>
      `,
    });
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
}
