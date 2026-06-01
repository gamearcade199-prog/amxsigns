with open('c:/Users/akib/Desktop/amx signs/email_templates_specification.md', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace the header tables with the simple span tag (standard version)
logo_table_standard_1 = """                <table border="0" cellpadding="0" cellspacing="0" style="display: inline-block; border-collapse: collapse; text-align: left; vertical-align: middle; margin: 0 auto;">
                  <tr>
                    <td valign="middle" style="padding-right: 8px; vertical-align: middle;">
                      <!-- Fixed Logo: Replaced SVG with Hosted PNG -->
                      <img src="https://vyuhmlyqciamgxkepbcq.supabase.co/storage/v1/object/public/email-assets/logo-bolt.png" width="36" height="36" alt="⚡" style="display: block; border: 0;">
                    </td>
                    <td valign="middle" style="vertical-align: middle; line-height: 36px; height: 36px;">
                      <span class="brand-font" style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: #ffffff; display: inline-block; vertical-align: middle; line-height: 36px;">
                        AMX<span class="brand-font" style="color: #C6FF00; font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif;">SIGNS</span>
                      </span>
                    </td>
                  </tr>
                </table>"""

logo_table_standard_2 = """                <table border="0" cellpadding="0" cellspacing="0" style="display: inline-block; border-collapse: collapse; text-align: left; vertical-align: middle; margin: 0 auto;">
                  <tr>
                    <td valign="middle" style="padding-right: 8px; vertical-align: middle;">
                      <img src="https://vyuhmlyqciamgxkepbcq.supabase.co/storage/v1/object/public/email-assets/logo-bolt.png" width="36" height="36" alt="⚡" style="display: block; border: 0;">
                    </td>
                    <td valign="middle" style="vertical-align: middle; line-height: 36px; height: 36px;">
                      <span class="brand-font" style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: #ffffff; display: inline-block; vertical-align: middle; line-height: 36px;">
                        AMX<span class="brand-font" style="color: #C6FF00; font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif;">SIGNS</span>
                      </span>
                    </td>
                  </tr>
                </table>"""

logo_table_pink = """                <table border="0" cellpadding="0" cellspacing="0" style="display: inline-block; border-collapse: collapse; text-align: left; vertical-align: middle; margin: 0 auto;">
                  <tr>
                    <td valign="middle" style="padding-right: 8px; vertical-align: middle;">
                      <img src="https://vyuhmlyqciamgxkepbcq.supabase.co/storage/v1/object/public/email-assets/logo-bolt.png" width="36" height="36" alt="⚡" style="display: block; border: 0;">
                    </td>
                    <td valign="middle" style="vertical-align: middle; line-height: 36px; height: 36px;">
                      <span class="brand-font" style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: #ffffff; display: inline-block; vertical-align: middle; line-height: 36px;">
                        AMX<span class="brand-font" style="color: #FF007A; font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif;">SIGNS</span>
                      </span>
                    </td>
                  </tr>
                </table>"""

logo_table_t9 = """                <table border="0" cellpadding="0" cellspacing="0" style="display: inline-block; border-collapse: collapse; text-align: left; vertical-align: middle; margin: 0 auto;">
                  <tr>
                    <td valign="middle" style="padding-right: 8px; vertical-align: middle;">
                      <table border="0" cellpadding="0" cellspacing="0" style="width: 36px; height: 36px; background-color: #C6FF00; border-radius: 50%; text-align: center; border-collapse: collapse;">
                        <tr>
                          <td align="center" valign="middle" style="height: 36px; width: 36px; line-height: 36px; vertical-align: middle; text-align: center; padding: 0;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: 0 auto; vertical-align: middle;">
                              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                            </svg>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="middle" style="vertical-align: middle; line-height: 36px; height: 36px;">
                      <span class="brand-font" style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: #ffffff; display: inline-block; vertical-align: middle; line-height: 36px;">
                        AMX<span class="brand-font" style="color: #C6FF00; font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif;">SIGNS</span>
                      </span>
                    </td>
                  </tr>
                </table>"""

logo_text_standard = """                <span class="brand-font" style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: #ffffff; display: inline-block; line-height: 36px;">
                  AMX<span class="brand-font" style="color: #C6FF00; font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif;">SIGNS</span>
                </span>"""

logo_text_pink = """                <span class="brand-font" style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: #ffffff; display: inline-block; line-height: 36px;">
                  AMX<span class="brand-font" style="color: #FF007A; font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif;">SIGNS</span>
                </span>"""

content = content.replace(logo_table_standard_1, logo_text_standard)
content = content.replace(logo_table_standard_2, logo_text_standard)
content = content.replace(logo_table_pink, logo_text_pink)
content = content.replace(logo_table_t9, logo_text_standard)

# Replace wrench icon image from Handcrafting section
content = content.replace('<img src="https://vyuhmlyqciamgxkepbcq.supabase.co/storage/v1/object/public/email-assets/icon-wrench.png" width="56" height="56" alt="🛠️" style="display: inline-block; border: 0; margin-bottom: 12px;">', '')

with open('c:/Users/akib/Desktop/amx signs/email_templates_specification.md', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated specification file")
