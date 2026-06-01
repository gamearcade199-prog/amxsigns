import os

templates = {}
for i in range(1, 10):
    with open(f'c:/Users/akib/Desktop/amx signs/scratch/template_{i}.html', 'r', encoding='utf-8') as f:
        templates[i] = f.read()

ts_code = """// Auto-generated from specifications
export function buildT1AEmail(vars: { name: string, order_id: string, custom_text: string, color_name: string, colorHex: string, font_name: string, fontFamily: string, backing: string, dimensions: string, qty: number, total: string }) {
  const html = `""" + templates[1].replace('`', '\\`').replace('$', '\\$') + """`;
  return html
    .replace(/\\{\\{name\\}\\}/g, vars.name)
    .replace(/\\{\\{order_id\\}\\}/g, vars.order_id)
    .replace(/\\{\\{customText\\}\\}/g, vars.custom_text)
    .replace(/\\{\\{colorName\\}\\}/g, vars.color_name)
    .replace(/\\{\\{colorHex\\}\\}/g, vars.colorHex)
    .replace(/\\{\\{fontName\\}\\}/g, vars.font_name)
    .replace(/\\{\\{fontFamily\\}\\}/g, vars.fontFamily)
    .replace(/\\{\\{backing\\}\\}/g, vars.backing)
    .replace(/\\{\\{dimensions\\}\\}/g, vars.dimensions)
    .replace(/\\{\\{qty\\}\\}/g, vars.qty.toString())
    .replace(/\\{\\{total\\}\\}/g, vars.total);
}

export function buildT1BEmail(vars: { name: string, order_id: string, total: string, address: string, city: string, itemsHtml: string }) {
  const rawHtml = `""" + templates[2].replace('`', '\\`').replace('$', '\\$') + """`;
  // Replace the dynamic row iterator block with generated itemsHtml
  const html = rawHtml.replace(/<!-- DYNAMIC ROW ITERATOR -->[\\s\\S]*?<!-- END ROW ITERATOR -->/g, vars.itemsHtml);
  return html
    .replace(/\\{\\{name\\}\\}/g, vars.name)
    .replace(/\\{\\{order_id\\}\\}/g, vars.order_id)
    .replace(/\\{\\{total\\}\\}/g, vars.total)
    .replace(/\\{\\{shipping_address\\}\\}/g, vars.address);
}

export function buildT2Email(vars: { name: string, order_id: string }) {
  return `""" + templates[3].replace('`', '\\`').replace('$', '\\$') + """`
    .replace(/\\{\\{name\\}\\}/g, vars.name)
    .replace(/\\{\\{order_id\\}\\}/g, vars.order_id);
}

export function buildT3Email(vars: { name: string, order_id: string }) {
  return `""" + templates[4].replace('`', '\\`').replace('$', '\\$') + """`
    .replace(/\\{\\{name\\}\\}/g, vars.name)
    .replace(/\\{\\{order_id\\}\\}/g, vars.order_id);
}

export function buildT4Email(vars: { name: string, order_id: string, carrier_name: string, tracking_id: string, tracking_url: string, eta_date: string }) {
  return `""" + templates[5].replace('`', '\\`').replace('$', '\\$') + """`
    .replace(/\\{\\{name\\}\\}/g, vars.name)
    .replace(/\\{\\{order_id\\}\\}/g, vars.order_id)
    .replace(/\\{\\{tracking_carrier\\}\\}/g, vars.carrier_name)
    .replace(/\\{\\{tracking_number\\}\\}/g, vars.tracking_id)
    .replace(/\\{\\{tracking_url\\}\\}/g, vars.tracking_url)
    .replace(/\\{\\{eta_date\\}\\}/g, vars.eta_date);
}

export function buildT5Email(vars: { name: string, order_id: string }) {
  return `""" + templates[6].replace('`', '\\`').replace('$', '\\$') + """`
    .replace(/\\{\\{name\\}\\}/g, vars.name)
    .replace(/\\{\\{order_id\\}\\}/g, vars.order_id);
}

export function buildT6Email(vars: { name: string, order_id: string, refund_amount: string }) {
  return `""" + templates[7].replace('`', '\\`').replace('$', '\\$') + """`
    .replace(/\\{\\{name\\}\\}/g, vars.name)
    .replace(/\\{\\{order_id\\}\\}/g, vars.order_id)
    .replace(/\\{\\{refund_amount\\}\\}/g, vars.refund_amount);
}

export function buildT7Email(vars: { name: string, reset_url: string }) {
  return `""" + templates[8].replace('`', '\\`').replace('$', '\\$') + """`
    .replace(/\\{\\{name\\}\\}/g, vars.name)
    .replace(/\\{\\{reset_url\\}\\}/g, vars.reset_url);
}

export function buildT8Email(vars: { name: string, custom_text: string, color_name: string, colorHex: string, font_name: string, fontFamily: string, size: string }) {
  return `""" + templates[9].replace('`', '\\`').replace('$', '\\$') + """`
    .replace(/\\{\\{name\\}\\}/g, vars.name)
    .replace(/\\{\\{customText\\}\\}/g, vars.custom_text)
    .replace(/\\{\\{colorName\\}\\}/g, vars.color_name)
    .replace(/\\{\\{colorHex\\}\\}/g, vars.colorHex)
    .replace(/\\{\\{fontName\\}\\}/g, vars.font_name)
    .replace(/\\{\\{fontFamily\\}\\}/g, vars.fontFamily)
    .replace(/\\{\\{size\\}\\}/g, vars.size);
}
"""

os.makedirs('c:/Users/akib/Desktop/amx signs/src/lib/email/templates', exist_ok=True)
with open('c:/Users/akib/Desktop/amx signs/src/lib/email/templates/index.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)
print('Wrote templates index.ts')
