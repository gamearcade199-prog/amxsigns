// Auto-generated from specifications
export function buildT1AEmail(vars: { name: string, order_id: string, custom_text: string, color_name: string, colorHex: string, font_name: string, fontFamily: string, backing: string, dimensions: string, qty: number, total: string }) {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmed - AMX Signs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@700&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    body, p, td, h2, h3, div, span {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    h1, h2, h3, h4, .brand-font {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    }
    .mono-font {
      font-family: 'JetBrains Mono', 'Courier New', Courier, monospace !important;
    }
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 20px 8px !important; }
      .email-card { padding: 28px 18px !important; border-radius: 12px !important; }
      .email-card h2 { font-size: 20px !important; }
      .spec-table td { font-size: 11px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #000000; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <!-- HEADER: Logo -->
          <tr>
            <td align="center" style="padding-bottom: 30px; text-align: center;">
              <a href="https://www.amxsigns.com" target="_blank" style="text-decoration: none; display: inline-block;">
                <span class="brand-font" style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: #ffffff; display: inline-block; line-height: 36px;">
                  AMX<span class="brand-font" style="color: #C6FF00; font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif;">SIGNS</span>
                </span>
              </a>
            </td>
          </tr>
          
          <!-- MAIN CONTENT BLOCK -->
          <tr>
            <td class="email-card" style="background-color: #0B0B0B; border: 1px solid #1A1A1A; border-top: 3px solid #C6FF00; border-radius: 16px; padding: 40px 30px; color: #ffffff;">
              <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 900; margin: 0 0 10px 0; color: #C6FF00; text-transform: uppercase; letter-spacing: 1px;">
                Order Confirmed!
              </h2>
              <p style="color: #A0A0A0; font-size: 14px; line-height: 1.6; margin: 0 0 25px 0;">
                Hi {{name}}, we've received your order! Your order ID is <strong style="color: #ffffff; font-family: 'JetBrains Mono', 'Courier New', monospace;">#{{order_id}}</strong>.
              </p>

              <!-- Specs Section -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px;">
                <tr>
                  <td style="border-bottom: 1px solid #1f1f1f; padding-bottom: 10px;">
                    <span style="font-size: 11px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Customization Specifications</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0;">
                    <!-- Glowing CSS Neon Preview -->
                    <div style="background-color: #000000; border: 1px solid #1a1a1a; border-radius: 12px; padding: 30px 15px; text-align: center; margin-bottom: 20px; overflow: hidden;">
                      <span style="font-family: '{{fontFamily}}', cursive, sans-serif; font-size: 32px; color: {{colorHex}}; text-shadow: 0 0 10px {{colorHex}}, 0 0 20px {{colorHex}}; line-height: 1.3;">
                        {{customText}}
                      </span>
                    </div>
                    
                    <!-- Specifications Detail Table -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121212; border-radius: 8px; padding: 15px;">
                      <tr>
                        <td width="50%" style="padding: 6px 8px; font-size: 12px; color: #888888; border-bottom: 1px solid #1a1a1a;">Text Pattern</td>
                        <td width="50%" style="padding: 6px 8px; font-size: 12px; color: #ffffff; text-align: right; font-weight: 700; border-bottom: 1px solid #1a1a1a;">"{{customText}}"</td>
                      </tr>
                      <tr>
                        <td width="50%" style="padding: 6px 8px; font-size: 12px; color: #888888; border-bottom: 1px solid #1a1a1a;">Glow Color</td>
                        <td width="50%" style="padding: 6px 8px; font-size: 12px; color: {{colorHex}}; text-align: right; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid #1a1a1a;">{{colorName}}</td>
                      </tr>
                      <tr>
                        <td width="50%" style="padding: 6px 8px; font-size: 12px; color: #888888; border-bottom: 1px solid #1a1a1a;">Font Selected</td>
                        <td width="50%" style="padding: 6px 8px; font-size: 12px; color: #ffffff; text-align: right; font-weight: 700; border-bottom: 1px solid #1a1a1a;">{{fontName}}</td>
                      </tr>
                      <tr>
                        <td width="50%" style="padding: 6px 8px; font-size: 12px; color: #888888; border-bottom: 1px solid #1a1a1a;">Backing Style</td>
                        <td width="50%" style="padding: 6px 8px; font-size: 12px; color: #ffffff; text-align: right; font-weight: 700; border-bottom: 1px solid #1a1a1a;">{{backing}}</td>
                      </tr>
                      <tr>
                        <td width="50%" style="padding: 6px 8px; font-size: 12px; color: #888888;">Dimensions</td>
                        <td width="50%" style="padding: 6px 8px; font-size: 12px; color: #36F4A4; text-align: right; font-family: 'JetBrains Mono', 'Courier New', monospace; font-weight: 700;">{{dimensions}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Handcrafting Schedule Box -->
              <div style="background-color: #121212; border: 1px dashed #1a1a1a; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <div style="font-size: 11px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Handcrafting</div>
                <p style="font-size: 13px; color: #dddddd; line-height: 1.5; margin: 0 0 12px 0;">
                  Our team is now getting ready to handcraft your sign. We will email you as soon as we start making it.
                </p>
                <p style="font-size: 13px; color: #dddddd; line-height: 1.5; margin: 0;">
                  Thank you for shopping with us!
                </p>
              </div>

              <!-- CTA Button -->
              <div align="center">
                <a href="https://www.amxsigns.com/profile" target="_blank" style="background-color: #C6FF00; color: #000000; text-decoration: none; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 15px 35px; border-radius: 9999px; display: inline-block;">
                  Track Design Status
                </a>
              </div>
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding-top: 40px; padding-bottom: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-size: 11px; color: #666666; font-family: 'Inter', sans-serif; line-height: 1.6;">
                    <p style="margin: 0; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 1px;">AMX Signs</p>
                    <p style="margin: 5px 0 15px 0;">Guwahati, India</p>
                    <p style="margin: 0;">
                      <a href="https://www.amxsigns.com/profile" style="color: #C6FF00; text-decoration: none;">My Account</a> &bull; 
                      <a href="https://www.amxsigns.com/contact" style="color: #C6FF00; text-decoration: none;">Help Center</a> &bull; 
                      <a href="https://www.amxsigns.com/privacy" style="color: #C6FF00; text-decoration: none;">Privacy Policy</a>
                    </p>
                    <p style="margin-top: 20px; font-size: 9px; color: #444444;">&copy; 2026 AMX Signs. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  return html
    .replace(/\{\{name\}\}/g, vars.name)
    .replace(/\{\{order_id\}\}/g, vars.order_id)
    .replace(/\{\{customText\}\}/g, vars.custom_text)
    .replace(/\{\{colorName\}\}/g, vars.color_name)
    .replace(/\{\{colorHex\}\}/g, vars.colorHex)
    .replace(/\{\{fontName\}\}/g, vars.font_name)
    .replace(/\{\{fontFamily\}\}/g, vars.fontFamily)
    .replace(/\{\{backing\}\}/g, vars.backing)
    .replace(/\{\{dimensions\}\}/g, vars.dimensions)
    .replace(/\{\{qty\}\}/g, vars.qty.toString())
    .replace(/\{\{total\}\}/g, vars.total);
}

export function buildT1BEmail(vars: { name: string, order_id: string, total: string, address: string, city: string, itemsHtml: string }) {
  const rawHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmed - AMX Signs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@700&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    body, p, td, h2, h3, div, span {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    h1, h2, h3, h4, .brand-font {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    }
    .mono-font {
      font-family: 'JetBrains Mono', 'Courier New', Courier, monospace !important;
    }
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 20px 8px !important; }
      .email-card { padding: 28px 18px !important; border-radius: 12px !important; }
      .email-card h2 { font-size: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #000000; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <!-- HEADER: Logo -->
          <tr>
            <td align="center" style="padding-bottom: 30px; text-align: center;">
              <a href="https://www.amxsigns.com" target="_blank" style="text-decoration: none; display: inline-block;">
                <span class="brand-font" style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: #ffffff; display: inline-block; line-height: 36px;">
                  AMX<span class="brand-font" style="color: #C6FF00; font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif;">SIGNS</span>
                </span>
              </a>
            </td>
          </tr>
          
          <!-- MAIN CONTENT BLOCK -->
          <tr>
            <td class="email-card" style="background-color: #0B0B0B; border: 1px solid #1A1A1A; border-top: 3px solid #C6FF00; border-radius: 16px; padding: 40px 30px; color: #ffffff;">
              <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 900; margin: 0 0 10px 0; color: #C6FF00; text-transform: uppercase; letter-spacing: 1px;">
                Order Confirmed!
              </h2>
              <p style="color: #A0A0A0; font-size: 14px; line-height: 1.6; margin: 0 0 25px 0;">
                Hi {{name}}, we've received your order! Your order ID is <strong style="color: #ffffff; font-family: 'JetBrains Mono', 'Courier New', monospace;">#{{order_id}}</strong>.
              </p>

              <!-- Products Ordered Table -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px;">
                <tr>
                  <td style="border-bottom: 1px solid #1f1f1f; padding-bottom: 10px;" colspan="3">
                    <span style="font-size: 11px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Items in Your Order</span>
                  </td>
                </tr>
                
                <!-- DYNAMIC ROW ITERATOR -->
                <tr>
                  <td style="padding: 20px 0; border-bottom: 1px solid #121212;" valign="top" width="80">
                    <img src="{{product_image}}" alt="{{product_title}}" width="70" height="70" style="border-radius: 8px; border: 1px solid #1a1a1a; object-fit: cover;">
                  </td>
                  <td style="padding: 20px 10px; border-bottom: 1px solid #121212;" valign="top">
                    <div style="font-size: 14px; font-weight: 700; color: #ffffff; margin-bottom: 4px;">{{product_title}}</div>
                    <div style="font-size: 12px; color: #666666; font-family: 'JetBrains Mono', 'Courier New', monospace;">Qty: {{quantity}} | Size: {{size}}</div>
                  </td>
                  <td style="padding: 20px 0; border-bottom: 1px solid #121212; font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 14px; font-weight: bold; color: #36F4A4; text-align: right;" valign="top" width="100">
                    ₹{{price}}
                  </td>
                </tr>
                <!-- END ROW ITERATOR -->
              </table>

              <!-- Delivery Details Box -->
              <div style="background-color: #121212; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <div style="font-size: 11px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Order Details</div>
                <p style="font-size: 13px; color: #dddddd; line-height: 1.5; margin: 0 0 12px 0;">
                  Our team is now getting ready to handcraft your sign. We will email you as soon as we start making it.
                </p>
                <p style="font-size: 13px; color: #dddddd; line-height: 1.5; margin: 0 0 12px 0;">
                  Thank you for shopping with us!
                </p>
                <div style="border-top: 1px solid #1a1a1a; padding-top: 12px;">
                  <span style="font-size: 11px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">Shipping Address</span>
                  <span style="font-size: 12px; color: #aaaaaa; line-height: 1.4;">{{shipping_address}}</span>
                </div>
              </div>

              <!-- CTA Button -->
              <div align="center">
                <a href="https://www.amxsigns.com/profile" style="background-color: #C6FF00; color: #000000; text-decoration: none; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 15px 35px; border-radius: 9999px; display: inline-block;">
                  View Order Details
                </a>
              </div>
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding-top: 40px; padding-bottom: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-size: 11px; color: #666666; font-family: 'Inter', sans-serif; line-height: 1.6;">
                    <p style="margin: 0; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 1px;">AMX Signs</p>
                    <p style="margin: 5px 0 15px 0;">Guwahati, India</p>
                    <p style="margin: 0;">
                      <a href="https://www.amxsigns.com/profile" style="color: #C6FF00; text-decoration: none;">My Account</a> &bull; 
                      <a href="https://www.amxsigns.com/contact" style="color: #C6FF00; text-decoration: none;">Help Center</a> &bull; 
                      <a href="https://www.amxsigns.com/privacy" style="color: #C6FF00; text-decoration: none;">Privacy Policy</a>
                    </p>
                    <p style="margin-top: 20px; font-size: 9px; color: #444444;">&copy; 2026 AMX Signs. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  // Replace the dynamic row iterator block with generated itemsHtml
  const html = rawHtml.replace(/<!-- DYNAMIC ROW ITERATOR -->[\s\S]*?<!-- END ROW ITERATOR -->/g, vars.itemsHtml);
  return html
    .replace(/\{\{name\}\}/g, vars.name)
    .replace(/\{\{order_id\}\}/g, vars.order_id)
    .replace(/\{\{total\}\}/g, vars.total)
    .replace(/\{\{shipping_address\}\}/g, vars.address);
}

export function buildT2Email(vars: { name: string, order_id: string }) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Handcrafting Started - AMX Signs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@700&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    body, p, td, h2, h3, div, span {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    h1, h2, h3, h4, .brand-font {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    }
    .mono-font {
      font-family: 'JetBrains Mono', 'Courier New', Courier, monospace !important;
    }
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 20px 8px !important; }
      .email-card { padding: 28px 18px !important; border-radius: 12px !important; }
      .email-card h2 { font-size: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #000000; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <!-- HEADER: Logo -->
          <tr>
            <td align="center" style="padding-bottom: 30px; text-align: center;">
              <a href="https://www.amxsigns.com" target="_blank" style="text-decoration: none; display: inline-block;">
                <span class="brand-font" style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: #ffffff; display: inline-block; line-height: 36px;">
                  AMX<span class="brand-font" style="color: #C6FF00; font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif;">SIGNS</span>
                </span>
              </a>
            </td>
          </tr>
          
          <!-- MAIN CONTENT BLOCK -->
          <tr>
            <td class="email-card" style="background-color: #0B0B0B; border: 1px solid #1A1A1A; border-top: 3px solid #FFB800; border-radius: 16px; padding: 40px 30px; color: #ffffff;">
              <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 900; margin: 0 0 10px 0; color: #C6FF00; text-transform: uppercase; letter-spacing: 1px;">
                Making Your Sign!
              </h2>
              <p style="color: #A0A0A0; font-size: 14px; line-height: 1.6; margin: 0 0 30px 0;">
                Hi {{name}}, we've started handcrafting your neon sign for Order <strong style="color: #ffffff; font-family: 'JetBrains Mono', 'Courier New', monospace;">#{{order_id}}</strong>. Our team is now bending the design and soldering the lights.
              </p>

              <!-- Graphic representation -->
              <div style="background-color: #121212; border-radius: 12px; padding: 25px; text-align: center; margin-bottom: 30px;">
                <h4 style="font-family: 'Outfit', sans-serif; color: #FFB800; font-size: 14px; font-weight: 700; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 1px;">
                  Handcrafting
                </h4>
                <p style="font-size: 12px; color: #888888; margin: 0; line-height: 1.5;">
                  Every sign is shaped, wired, and tested by hand in our workshop.
                </p>
              </div>

              <!-- Progress bar -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 35px;">
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; max-width: 480px; text-align: center; margin: 0 auto; font-family: 'Inter', sans-serif;">
                      <tr>
                        <td width="60" style="width: 60px; vertical-align: top; text-align: center; padding: 0; padding-top: 4px;">
                          <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #C6FF00; display: inline-block; box-shadow: 0 0 8px #C6FF00;"></div>
                          <div style="font-size: 8px; font-weight: bold; color: #888888; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; margin-top: 8px;">Placed</div>
                        </td>
                        <td style="vertical-align: top; padding: 0; padding-top: 8px; min-width: 10px;">
                          <div style="height: 2px; background-color: #C6FF00; width: 100%; font-size: 1px; line-height: 1px;"></div>
                        </td>
                        <td width="60" style="width: 60px; vertical-align: top; text-align: center; padding: 0; padding-top: 0px;">
                          <div style="width: 14px; height: 14px; border-radius: 50%; background-color: #C6FF00; border: 2px solid #000; display: inline-block; box-shadow: 0 0 15px #C6FF00;"></div>
                          <div style="font-size: 8px; font-weight: 900; color: #C6FF00; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; margin-top: 4px;">Crafting</div>
                        </td>
                        <td style="vertical-align: top; padding: 0; padding-top: 8px; min-width: 10px;">
                          <div style="height: 2px; background-color: #1a1a1a; width: 100%; font-size: 1px; line-height: 1px;"></div>
                        </td>
                        <td width="60" style="width: 60px; vertical-align: top; text-align: center; padding: 0; padding-top: 4px;">
                          <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #1a1a1a; display: inline-block;"></div>
                          <div style="font-size: 8px; font-weight: bold; color: #444444; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; margin-top: 8px;">QC</div>
                        </td>
                        <td style="vertical-align: top; padding: 0; padding-top: 8px; min-width: 10px;">
                          <div style="height: 2px; background-color: #1a1a1a; width: 100%; font-size: 1px; line-height: 1px;"></div>
                        </td>
                        <td width="60" style="width: 60px; vertical-align: top; text-align: center; padding: 0; padding-top: 4px;">
                          <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #1a1a1a; display: inline-block;"></div>
                          <div style="font-size: 8px; font-weight: bold; color: #444444; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; margin-top: 8px;">Shipped</div>
                        </td>
                        <td style="vertical-align: top; padding: 0; padding-top: 8px; min-width: 10px;">
                          <div style="height: 2px; background-color: #1a1a1a; width: 100%; font-size: 1px; line-height: 1px;"></div>
                        </td>
                        <td width="60" style="width: 60px; vertical-align: top; text-align: center; padding: 0; padding-top: 4px;">
                          <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #1a1a1a; display: inline-block;"></div>
                          <div style="font-size: 8px; font-weight: bold; color: #444444; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; margin-top: 8px;">Delivered</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <div align="center">
                <a href="https://www.amxsigns.com/profile" target="_blank" style="background-color: transparent; border: 1px solid #C6FF00; color: #C6FF00; text-decoration: none; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 28px; border-radius: 9999px; display: inline-block;">
                  Track Live Progress
                </a>
              </div>
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding-top: 40px; padding-bottom: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-size: 11px; color: #666666; font-family: 'Inter', sans-serif; line-height: 1.6;">
                    <p style="margin: 0; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 1px;">AMX Signs</p>
                    <p style="margin: 5px 0 15px 0;">Guwahati, India</p>
                    <p style="margin: 0;">
                      <a href="https://www.amxsigns.com/profile" style="color: #C6FF00; text-decoration: none;">My Account</a> &bull; 
                      <a href="https://www.amxsigns.com/contact" style="color: #C6FF00; text-decoration: none;">Help Center</a> &bull; 
                      <a href="https://www.amxsigns.com/privacy" style="color: #C6FF00; text-decoration: none;">Privacy Policy</a>
                    </p>
                    <p style="margin-top: 20px; font-size: 9px; color: #444444;">&copy; 2026 AMX Signs. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    .replace(/\{\{name\}\}/g, vars.name)
    .replace(/\{\{order_id\}\}/g, vars.order_id);
}

export function buildT3Email(vars: { name: string, order_id: string }) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quality Testing - AMX Signs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@700&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    body, p, td, h2, h3, div, span {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    h1, h2, h3, h4, .brand-font {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    }
    .mono-font {
      font-family: 'JetBrains Mono', 'Courier New', Courier, monospace !important;
    }
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 20px 8px !important; }
      .email-card { padding: 28px 18px !important; border-radius: 12px !important; }
      .email-card h2 { font-size: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #000000; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <!-- HEADER: Logo -->
          <tr>
            <td align="center" style="padding-bottom: 30px; text-align: center;">
              <a href="https://www.amxsigns.com" target="_blank" style="text-decoration: none; display: inline-block;">
                <span class="brand-font" style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: #ffffff; display: inline-block; line-height: 36px;">
                  AMX<span class="brand-font" style="color: #C6FF00; font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif;">SIGNS</span>
                </span>
              </a>
            </td>
          </tr>
          
          <!-- MAIN CONTENT BLOCK -->
          <tr>
            <td class="email-card" style="background-color: #0B0B0B; border: 1px solid #1A1A1A; border-top: 3px solid #00D4FF; border-radius: 16px; padding: 40px 30px; color: #ffffff;">
              <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 900; margin: 0 0 10px 0; color: #C6FF00; text-transform: uppercase; letter-spacing: 1px;">
                Quality Check
              </h2>
              <p style="color: #A0A0A0; font-size: 14px; line-height: 1.6; margin: 0 0 30px 0;">
                Hi {{name}}, your sign is fully built! We are now doing quality checks on the wiring, colors, and lights to make sure everything is perfect before it leaves.
              </p>

              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121212; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 8px 0; font-size: 12px; color: #C6FF00; font-weight: 700; border-bottom: 1px solid #1a1a1a;">
                    <span style="color: #C6FF00; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: bold; margin-right: 8px;">✓</span>
                    Glow Test
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 12px; color: #C6FF00; font-weight: 700; border-bottom: 1px solid #1a1a1a;">
                    <span style="color: #C6FF00; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: bold; margin-right: 8px;">✓</span>
                    Wiring &amp; Safety Check
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 12px; color: #C6FF00; font-weight: 700;">
                    <span style="color: #C6FF00; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: bold; margin-right: 8px;">✓</span>
                    Surface Clean &amp; Polish
                  </td>
                </tr>
              </table>

              <!-- Progress bar -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 35px;">
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; max-width: 480px; text-align: center; margin: 0 auto; font-family: 'Inter', sans-serif;">
                      <tr>
                        <td width="60" style="width: 60px; vertical-align: top; text-align: center; padding: 0; padding-top: 4px;">
                          <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #C6FF00; display: inline-block; box-shadow: 0 0 8px #C6FF00;"></div>
                          <div style="font-size: 8px; font-weight: bold; color: #888888; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; margin-top: 8px;">Placed</div>
                        </td>
                        <td style="vertical-align: top; padding: 0; padding-top: 8px; min-width: 10px;">
                          <div style="height: 2px; background-color: #C6FF00; width: 100%; font-size: 1px; line-height: 1px;"></div>
                        </td>
                        <td width="60" style="width: 60px; vertical-align: top; text-align: center; padding: 0; padding-top: 4px;">
                          <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #C6FF00; display: inline-block; box-shadow: 0 0 8px #C6FF00;"></div>
                          <div style="font-size: 8px; font-weight: bold; color: #888888; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; margin-top: 8px;">Crafting</div>
                        </td>
                        <td style="vertical-align: top; padding: 0; padding-top: 8px; min-width: 10px;">
                          <div style="height: 2px; background-color: #C6FF00; width: 100%; font-size: 1px; line-height: 1px;"></div>
                        </td>
                        <td width="60" style="width: 60px; vertical-align: top; text-align: center; padding: 0; padding-top: 0px;">
                          <div style="width: 14px; height: 14px; border-radius: 50%; background-color: #C6FF00; border: 2px solid #000; display: inline-block; box-shadow: 0 0 15px #C6FF00;"></div>
                          <div style="font-size: 8px; font-weight: 900; color: #C6FF00; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; margin-top: 4px;">QC</div>
                        </td>
                        <td style="vertical-align: top; padding: 0; padding-top: 8px; min-width: 10px;">
                          <div style="height: 2px; background-color: #1a1a1a; width: 100%; font-size: 1px; line-height: 1px;"></div>
                        </td>
                        <td width="60" style="width: 60px; vertical-align: top; text-align: center; padding: 0; padding-top: 4px;">
                          <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #1a1a1a; display: inline-block;"></div>
                          <div style="font-size: 8px; font-weight: bold; color: #444444; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; margin-top: 8px;">Shipped</div>
                        </td>
                        <td style="vertical-align: top; padding: 0; padding-top: 8px; min-width: 10px;">
                          <div style="height: 2px; background-color: #1a1a1a; width: 100%; font-size: 1px; line-height: 1px;"></div>
                        </td>
                        <td width="60" style="width: 60px; vertical-align: top; text-align: center; padding: 0; padding-top: 4px;">
                          <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #1a1a1a; display: inline-block;"></div>
                          <div style="font-size: 8px; font-weight: bold; color: #444444; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; margin-top: 8px;">Delivered</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <div align="center">
                <a href="https://www.amxsigns.com/profile" target="_blank" style="background-color: transparent; border: 1px solid #C6FF00; color: #C6FF00; text-decoration: none; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 28px; border-radius: 9999px; display: inline-block;">
                  Check Status Details
                </a>
              </div>
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding-top: 40px; padding-bottom: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-size: 11px; color: #666666; font-family: 'Inter', sans-serif; line-height: 1.6;">
                    <p style="margin: 0; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 1px;">AMX Signs</p>
                    <p style="margin: 5px 0 15px 0;">Guwahati, India</p>
                    <p style="margin: 0;">
                      <a href="https://www.amxsigns.com/profile" style="color: #C6FF00; text-decoration: none;">My Account</a> &bull; 
                      <a href="https://www.amxsigns.com/contact" style="color: #C6FF00; text-decoration: none;">Help Center</a> &bull; 
                      <a href="https://www.amxsigns.com/privacy" style="color: #C6FF00; text-decoration: none;">Privacy Policy</a>
                    </p>
                    <p style="margin-top: 20px; font-size: 9px; color: #444444;">&copy; 2026 AMX Signs. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    .replace(/\{\{name\}\}/g, vars.name)
    .replace(/\{\{order_id\}\}/g, vars.order_id);
}

export function buildT4Email(vars: { name: string, order_id: string, carrier_name: string, tracking_id: string, tracking_url: string, eta_date: string }) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Shipped - AMX Signs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@700&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    body, p, td, h2, h3, div, span {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    h1, h2, h3, h4, .brand-font {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    }
    .mono-font {
      font-family: 'JetBrains Mono', 'Courier New', Courier, monospace !important;
    }
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 20px 8px !important; }
      .email-card { padding: 28px 18px !important; border-radius: 12px !important; }
      .email-card h2 { font-size: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #000000; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <!-- HEADER: Logo -->
          <tr>
            <td align="center" style="padding-bottom: 30px; text-align: center;">
              <a href="https://www.amxsigns.com" target="_blank" style="text-decoration: none; display: inline-block;">
                <span class="brand-font" style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: #ffffff; display: inline-block; line-height: 36px;">
                  AMX<span class="brand-font" style="color: #C6FF00; font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif;">SIGNS</span>
                </span>
              </a>
            </td>
          </tr>
          
          <!-- MAIN CONTENT BLOCK -->
          <tr>
            <td class="email-card" style="background-color: #0B0B0B; border: 1px solid #1A1A1A; border-top: 3px solid #C6FF00; border-radius: 16px; padding: 40px 30px; color: #ffffff;">
              <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 900; margin: 0 0 10px 0; color: #C6FF00; text-transform: uppercase; letter-spacing: 1px;">
                Shipped & En Route!
              </h2>
              <p style="color: #A0A0A0; font-size: 14px; line-height: 1.6; margin: 0 0 30px 0;">
                Hi {{name}}, great news! We've finished making and testing your neon sign for Order <strong style="color: #ffffff; font-family: 'JetBrains Mono', 'Courier New', monospace;">#{{order_id}}</strong>, and it is now on its way to you.
              </p>

              <!-- Tracking Details box -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121212; border-radius: 12px; padding: 20px; margin-bottom: 30px; font-family: 'Inter', sans-serif;">
                <tr>
                  <td style="padding: 6px 0; font-size: 12px; color: #888888;">Delivery Service</td>
                  <td style="padding: 6px 0; font-size: 12px; color: #ffffff; font-weight: bold; text-align: right;">{{tracking_carrier}}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 12px; color: #888888;">Tracking Number</td>
                  <td style="padding: 6px 0; font-size: 12px; color: #36F4A4; font-family: 'JetBrains Mono', 'Courier New', monospace; font-weight: bold; text-align: right;">{{tracking_number}}</td>
                </tr>
              </table>

              <!-- Progress bar -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 35px;">
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; max-width: 480px; text-align: center; margin: 0 auto; font-family: 'Inter', sans-serif;">
                      <tr>
                        <td width="60" style="width: 60px; vertical-align: top; text-align: center; padding: 0; padding-top: 4px;">
                          <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #C6FF00; display: inline-block; box-shadow: 0 0 8px #C6FF00;"></div>
                          <div style="font-size: 8px; font-weight: bold; color: #888888; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; margin-top: 8px;">Placed</div>
                        </td>
                        <td style="vertical-align: top; padding: 0; padding-top: 8px; min-width: 10px;">
                          <div style="height: 2px; background-color: #C6FF00; width: 100%; font-size: 1px; line-height: 1px;"></div>
                        </td>
                        <td width="60" style="width: 60px; vertical-align: top; text-align: center; padding: 0; padding-top: 4px;">
                          <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #C6FF00; display: inline-block; box-shadow: 0 0 8px #C6FF00;"></div>
                          <div style="font-size: 8px; font-weight: bold; color: #888888; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; margin-top: 8px;">Crafting</div>
                        </td>
                        <td style="vertical-align: top; padding: 0; padding-top: 8px; min-width: 10px;">
                          <div style="height: 2px; background-color: #C6FF00; width: 100%; font-size: 1px; line-height: 1px;"></div>
                        </td>
                        <td width="60" style="width: 60px; vertical-align: top; text-align: center; padding: 0; padding-top: 4px;">
                          <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #C6FF00; display: inline-block; box-shadow: 0 0 8px #C6FF00;"></div>
                          <div style="font-size: 8px; font-weight: bold; color: #888888; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; margin-top: 8px;">QC</div>
                        </td>
                        <td style="vertical-align: top; padding: 0; padding-top: 8px; min-width: 10px;">
                          <div style="height: 2px; background-color: #C6FF00; width: 100%; font-size: 1px; line-height: 1px;"></div>
                        </td>
                        <td width="60" style="width: 60px; vertical-align: top; text-align: center; padding: 0; padding-top: 0px;">
                          <div style="width: 14px; height: 14px; border-radius: 50%; background-color: #C6FF00; border: 2px solid #000; display: inline-block; box-shadow: 0 0 15px #C6FF00;"></div>
                          <div style="font-size: 8px; font-weight: 900; color: #C6FF00; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; margin-top: 4px;">Shipped</div>
                        </td>
                        <td style="vertical-align: top; padding: 0; padding-top: 8px; min-width: 10px;">
                          <div style="height: 2px; background-color: #1a1a1a; width: 100%; font-size: 1px; line-height: 1px;"></div>
                        </td>
                        <td width="60" style="width: 60px; vertical-align: top; text-align: center; padding: 0; padding-top: 4px;">
                          <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #1a1a1a; display: inline-block;"></div>
                          <div style="font-size: 8px; font-weight: bold; color: #444444; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; margin-top: 8px;">Delivered</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA to Tracking URL -->
              <div align="center">
                <a href="{{tracking_url}}" target="_blank" style="background-color: #C6FF00; color: #000000; text-decoration: none; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 15px 35px; border-radius: 9999px; display: inline-block; box-shadow: 0 0 15px rgba(198, 255, 0, 0.3);">
                  Track Shipment
                </a>
              </div>
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding-top: 40px; padding-bottom: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-size: 11px; color: #666666; font-family: 'Inter', sans-serif; line-height: 1.6;">
                    <p style="margin: 0; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 1px;">AMX Signs</p>
                    <p style="margin: 5px 0 15px 0;">Guwahati, India</p>
                    <p style="margin: 0;">
                      <a href="https://www.amxsigns.com/profile" style="color: #C6FF00; text-decoration: none;">My Account</a> &bull; 
                      <a href="https://www.amxsigns.com/contact" style="color: #C6FF00; text-decoration: none;">Help Center</a> &bull; 
                      <a href="https://www.amxsigns.com/privacy" style="color: #C6FF00; text-decoration: none;">Privacy Policy</a>
                    </p>
                    <p style="margin-top: 20px; font-size: 9px; color: #444444;">&copy; 2026 AMX Signs. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    .replace(/\{\{name\}\}/g, vars.name)
    .replace(/\{\{order_id\}\}/g, vars.order_id)
    .replace(/\{\{tracking_carrier\}\}/g, vars.carrier_name)
    .replace(/\{\{tracking_number\}\}/g, vars.tracking_id)
    .replace(/\{\{tracking_url\}\}/g, vars.tracking_url)
    .replace(/\{\{eta_date\}\}/g, vars.eta_date);
}

export function buildT5Email(vars: { name: string, order_id: string }) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Delivered - AMX Signs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@700&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    body, p, td, h2, h3, div, span {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    h1, h2, h3, h4, .brand-font {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    }
    .mono-font {
      font-family: 'JetBrains Mono', 'Courier New', Courier, monospace !important;
    }
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 20px 8px !important; }
      .email-card { padding: 28px 18px !important; border-radius: 12px !important; }
      .email-card h2 { font-size: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #000000; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <!-- HEADER: Logo -->
          <tr>
            <td align="center" style="padding-bottom: 30px; text-align: center;">
              <a href="https://www.amxsigns.com" target="_blank" style="text-decoration: none; display: inline-block;">
                <span class="brand-font" style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: #ffffff; display: inline-block; line-height: 36px;">
                  AMX<span class="brand-font" style="color: #C6FF00; font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif;">SIGNS</span>
                </span>
              </a>
            </td>
          </tr>
          
          <!-- MAIN CONTENT BLOCK -->
          <tr>
            <td class="email-card" style="background-color: #0B0B0B; border: 1px solid #1A1A1A; border-top: 3px solid #36F4A4; border-radius: 16px; padding: 40px 30px; color: #ffffff;">
              <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 900; margin: 0 0 10px 0; color: #C6FF00; text-transform: uppercase; letter-spacing: 1px;">
                Delivered!
              </h2>
              <p style="color: #A0A0A0; font-size: 14px; line-height: 1.6; margin: 0 0 30px 0;">
                Hi {{name}}, your neon sign for Order <strong style="color: #ffffff; font-family: 'JetBrains Mono', 'Courier New', monospace;">#{{order_id}}</strong> has been delivered! It's time to hang it up and light up your space.
              </p>


              <div align="center">
                <a href="https://www.amxsigns.com/profile" target="_blank" style="background-color: #C6FF00; color: #000000; text-decoration: none; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 15px 35px; border-radius: 9999px; display: inline-block;">
                  View Order Invoice
                </a>
              </div>
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding-top: 40px; padding-bottom: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-size: 11px; color: #666666; font-family: 'Inter', sans-serif; line-height: 1.6;">
                    <p style="margin: 0; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 1px;">AMX Signs</p>
                    <p style="margin: 5px 0 15px 0;">Guwahati, India</p>
                    <p style="margin: 0;">
                      <a href="https://www.amxsigns.com/profile" style="color: #C6FF00; text-decoration: none;">My Account</a> &bull; 
                      <a href="https://www.amxsigns.com/contact" style="color: #C6FF00; text-decoration: none;">Help Center</a> &bull; 
                      <a href="https://www.amxsigns.com/privacy" style="color: #C6FF00; text-decoration: none;">Privacy Policy</a>
                    </p>
                    <p style="margin-top: 20px; font-size: 9px; color: #444444;">&copy; 2026 AMX Signs. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    .replace(/\{\{name\}\}/g, vars.name)
    .replace(/\{\{order_id\}\}/g, vars.order_id);
}

export function buildT6Email(vars: { name: string, order_id: string, refund_amount: string }) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Cancelled - AMX Signs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@700&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    body, p, td, h2, h3, div, span {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    h1, h2, h3, h4, .brand-font {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    }
    .mono-font {
      font-family: 'JetBrains Mono', 'Courier New', Courier, monospace !important;
    }
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 20px 8px !important; }
      .email-card { padding: 28px 18px !important; border-radius: 12px !important; }
      .email-card h2 { font-size: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #000000; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <!-- HEADER: Logo -->
          <tr>
            <td align="center" style="padding-bottom: 30px; text-align: center;">
              <a href="https://www.amxsigns.com" target="_blank" style="text-decoration: none; display: inline-block;">
                <span class="brand-font" style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: #ffffff; display: inline-block; line-height: 36px;">
                  AMX<span class="brand-font" style="color: #FF007A; font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif;">SIGNS</span>
                </span>
              </a>
            </td>
          </tr>
          
          <!-- MAIN CONTENT BLOCK -->
          <tr>
            <td class="email-card" style="background-color: #0B0B0B; border: 1px solid #1A1A1A; border-top: 3px solid #FF007A; border-radius: 16px; padding: 40px 30px; color: #ffffff;">
              <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 900; margin: 0 0 10px 0; color: #FF007A; text-transform: uppercase; letter-spacing: 1px;">
                Order Cancelled
              </h2>
              <p style="color: #A0A0A0; font-size: 14px; line-height: 1.6; margin: 0 0 25px 0;">
                Hi {{name}}, your Order <strong style="color: #ffffff; font-family: 'JetBrains Mono', 'Courier New', monospace;">#{{order_id}}</strong> has been cancelled.
              </p>

              <!-- Refund warning box -->
              <div style="background-color: #121212; border-left: 4px solid #FF007A; border-radius: 4px; padding: 15px; margin-bottom: 30px;">
                <p style="font-size: 13px; color: #dddddd; margin: 0; line-height: 1.5;">
                  <strong>Refund:</strong> We have sent a refund of <span style="color: #36F4A4; font-weight: bold; font-family: 'JetBrains Mono', 'Courier New', monospace;">₹{{refund_amount}}</span> back to your original payment method. It usually takes 5-7 business days to show up in your account.
                </p>
              </div>

              <p style="color: #888888; font-size: 12px; line-height: 1.6; margin-bottom: 30px;">
                If this cancellation was unintended, or you would like to rebuild your order, please visit your account dashboard or connect with our support agents.
              </p>

              <div align="center">
                <a href="https://www.amxsigns.com/collections" style="background-color: transparent; border: 1px solid #ffffff; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 28px; border-radius: 9999px; display: inline-block;">
                  Browse Our Signs
                </a>
              </div>
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding-top: 40px; padding-bottom: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-size: 11px; color: #666666; font-family: 'Inter', sans-serif; line-height: 1.6;">
                    <p style="margin: 0; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 1px;">AMX Signs</p>
                    <p style="margin: 5px 0 15px 0;">Guwahati, India</p>
                    <p style="margin: 0;">
                      <a href="https://www.amxsigns.com/profile" style="color: #C6FF00; text-decoration: none;">My Account</a> &bull; 
                      <a href="https://www.amxsigns.com/contact" style="color: #C6FF00; text-decoration: none;">Help Center</a> &bull; 
                      <a href="https://www.amxsigns.com/privacy" style="color: #C6FF00; text-decoration: none;">Privacy Policy</a>
                    </p>
                    <p style="margin-top: 20px; font-size: 9px; color: #444444;">&copy; 2026 AMX Signs. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    .replace(/\{\{name\}\}/g, vars.name)
    .replace(/\{\{order_id\}\}/g, vars.order_id)
    .replace(/\{\{refund_amount\}\}/g, vars.refund_amount);
}

export function buildT7Email(vars: { name: string, reset_url: string }) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Set New Password - AMX Signs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@700&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    body, p, td, h2, h3, div, span {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    h1, h2, h3, h4, .brand-font {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    }
    .mono-font {
      font-family: 'JetBrains Mono', 'Courier New', Courier, monospace !important;
    }
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 20px 8px !important; }
      .email-card { padding: 28px 18px !important; border-radius: 12px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #000000; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <!-- HEADER: Logo -->
          <tr>
            <td align="center" style="padding-bottom: 30px; text-align: center;">
              <a href="https://www.amxsigns.com" target="_blank" style="text-decoration: none; display: inline-block;">
                <span class="brand-font" style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: #ffffff; display: inline-block; line-height: 36px;">
                  AMX<span class="brand-font" style="color: #C6FF00; font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif;">SIGNS</span>
                </span>
              </a>
            </td>
          </tr>
          
          <!-- MAIN CONTENT BLOCK -->
          <tr>
            <td class="email-card" style="background-color: #0B0B0B; border: 1px solid #1A1A1A; border-top: 3px solid #555555; border-radius: 16px; padding: 40px 30px; color: #ffffff;">
              <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 900; margin: 0 0 10px 0; color: #ffffff; text-transform: uppercase; letter-spacing: 1px;">
                Set Your New Password
              </h2>
              <p style="color: #A0A0A0; font-size: 14px; line-height: 1.6; margin: 0 0 25px 0;">
                Hi there, click the link below to set your new password.
              </p>

              <!-- CTA Button -->
              <div align="center" style="margin-top: 30px; margin-bottom: 30px;">
                <a href="{{reset_url}}" target="_blank" style="background-color: #C6FF00; color: #000000; text-decoration: none; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 15px 35px; border-radius: 9999px; display: inline-block; box-shadow: 0 0 15px rgba(198, 255, 0, 0.3);">
                  Set New Password
                </a>
              </div>

              <p style="color: #666666; font-size: 11px; line-height: 1.5; margin: 0;">
                This link is valid for 2 hours. If you didn't request a password reset, you can ignore this email.
              </p>
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding-top: 40px; padding-bottom: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-size: 11px; color: #666666; font-family: 'Inter', sans-serif; line-height: 1.6;">
                    <p style="margin: 0; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 1px;">AMX Signs</p>
                    <p style="margin: 5px 0 15px 0;">Guwahati, India</p>
                    <p style="margin: 0;">
                      <a href="https://www.amxsigns.com/profile" style="color: #C6FF00; text-decoration: none;">My Account</a> &bull; 
                      <a href="https://www.amxsigns.com/contact" style="color: #C6FF00; text-decoration: none;">Help Center</a> &bull; 
                      <a href="https://www.amxsigns.com/privacy" style="color: #C6FF00; text-decoration: none;">Privacy Policy</a>
                    </p>
                    <p style="margin-top: 20px; font-size: 9px; color: #444444;">&copy; 2026 AMX Signs. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    .replace(/\{\{name\}\}/g, vars.name)
    .replace(/\{\{reset_url\}\}/g, vars.reset_url);
}

export function buildT8Email(vars: { name: string, custom_text: string, color_name: string, colorHex: string, font_name: string, fontFamily: string, size: string }) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Design Is Saved - AMX Signs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@700&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    body, p, td, h2, h3, div, span {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    h1, h2, h3, h4, .brand-font {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    }
    .mono-font {
      font-family: 'JetBrains Mono', 'Courier New', Courier, monospace !important;
    }
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 20px 8px !important; }
      .email-card { padding: 28px 18px !important; border-radius: 12px !important; }
      .email-card h2 { font-size: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #000000; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <!-- HEADER: Logo -->
          <tr>
            <td align="center" style="padding-bottom: 30px; text-align: center;">
              <a href="https://www.amxsigns.com" target="_blank" style="text-decoration: none; display: inline-block;">
                <span class="brand-font" style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: #ffffff; display: inline-block; line-height: 36px;">
                  AMX<span class="brand-font" style="color: #C6FF00; font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif;">SIGNS</span>
                </span>
              </a>
            </td>
          </tr>
          
          <!-- MAIN CONTENT BLOCK -->
          <tr>
            <td class="email-card" style="background-color: #0B0B0B; border: 1px solid #1A1A1A; border-top: 3px solid #FF6B00; border-radius: 16px; padding: 40px 30px; color: #ffffff;">
              <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 900; margin: 0 0 10px 0; color: #FF6B00; text-transform: uppercase; letter-spacing: 1px;">
                Your Design Is Waiting.
              </h2>
              <p style="color: #A0A0A0; font-size: 14px; line-height: 1.6; margin: 0 0 25px 0;">
                Hi {{name}}, your custom neon sign is still saved in your cart. We hold designs for a limited time — here's a one-time offer to help you get it home.
              </p>

              <!-- saved custom items list -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px;">
                <tr>
                  <td style="padding: 20px; background-color: #121212; border-radius: 12px; border: 1px solid #1a1a1a;">
                    <div style="font-size: 14px; font-weight: 700; color: #ffffff; margin-bottom: 12px;">Saved Custom Design</div>
                    
                    <!-- Glowing Preview -->
                    <div style="background-color: #000000; border: 1px solid #1a1a1a; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 12px;">
                      <span style="font-family: '{{fontFamily}}', cursive, sans-serif; font-size: 24px; color: {{colorHex}}; text-shadow: 0 0 8px {{colorHex}}, 0 0 15px {{colorHex}}; line-height: 1.2;">
                        {{customText}}
                      </span>
                    </div>
                    
                    <!-- Specs short list -->
                    <div style="font-size: 11px; color: #888888; font-family: 'Inter', sans-serif; line-height: 1.6;">
                      Color: <strong style="color: #ffffff;">{{colorName}}</strong> &bull; Font: <strong style="color: #ffffff;">{{fontName}}</strong> &bull; Size: <strong style="color: #ffffff;">{{size}}</strong>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Incentives Promo Box -->
              <div style="background-color: #0d0d00; border: 2px dashed #FF6B00; border-radius: 12px; padding: 25px; text-align: center; margin-bottom: 30px;">
                <div style="font-size: 11px; font-weight: bold; color: #FF6B00; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">One-Time Offer · Expires in 24 hrs</div>
                <div style="font-size: 22px; font-weight: 900; color: #ffffff; margin-bottom: 8px;">10% Off — Just For You</div>
                <p style="font-size: 13px; color: #A0A0A0; margin: 0 0 15px 0; line-height: 1.5;">Use this code at checkout. It won't last long:</p>
                <div style="display: inline-block; background-color: #000000; border: 1px solid #FF6B00; padding: 12px 24px; border-radius: 8px; font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 20px; font-weight: bold; color: #FF6B00; letter-spacing: 2px;">
                  COMEBACK10
                </div>
              </div>

              <!-- CTA Button -->
              <div align="center">
                <a href="https://www.amxsigns.com/collections" target="_blank" style="background-color: #C6FF00; color: #000000; text-decoration: none; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 15px 35px; border-radius: 9999px; display: inline-block; box-shadow: 0 0 15px rgba(198, 255, 0, 0.3);">
                  Resume Your Order
                </a>
              </div>
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding-top: 40px; padding-bottom: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-size: 11px; color: #666666; font-family: 'Inter', sans-serif; line-height: 1.6;">
                    <p style="margin: 0; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 1px;">AMX Signs</p>
                    <p style="margin: 5px 0 15px 0;">Guwahati, India</p>
                    <p style="margin: 0;">
                      <a href="https://www.amxsigns.com/profile" style="color: #C6FF00; text-decoration: none;">My Account</a> &bull; 
                      <a href="https://www.amxsigns.com/contact" style="color: #C6FF00; text-decoration: none;">Help Center</a> &bull; 
                      <a href="https://www.amxsigns.com/privacy" style="color: #C6FF00; text-decoration: none;">Privacy Policy</a>
                    </p>
                    <p style="margin-top: 20px; font-size: 9px; color: #444444;">&copy; 2026 AMX Signs. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    .replace(/\{\{name\}\}/g, vars.name)
    .replace(/\{\{customText\}\}/g, vars.custom_text)
    .replace(/\{\{colorName\}\}/g, vars.color_name)
    .replace(/\{\{colorHex\}\}/g, vars.colorHex)
    .replace(/\{\{fontName\}\}/g, vars.font_name)
    .replace(/\{\{fontFamily\}\}/g, vars.fontFamily)
    .replace(/\{\{size\}\}/g, vars.size);
}
