import { Resend } from 'resend'
import { buildT2Email } from './src/lib/email/templates'

async function test() {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not defined in environment.");
    return;
  }
  
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  const html = buildT2Email({
    name: 'Akib Husain',
    order_id: 'AMX-TEST-9999'
  });
  
  const res = await resend.emails.send({
    from: 'AMX Signs <orders@amxsigns.com>',
    to: 'akibhusain830@gmail.com',
    subject: "Making your sign (Final Mathematically Perfect Mobile Fix)!",
    html: html
  });
  
  console.log("Resend Response:", res);
}

test();
