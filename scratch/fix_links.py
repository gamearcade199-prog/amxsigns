import os

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
            modified = True
            
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated links in: {filepath}")

# Replacements for HTML and MD files
replacements_html = [
    ("https://amxsigns.com/profile/orders", "https://amxsigns.com/profile"),
    ("https://amxsigns.com/support", "https://amxsigns.com/contact"),
    ("https://amxsigns.com/terms", "https://amxsigns.com/privacy"),
    ("https://amxsigns.com/shop", "https://amxsigns.com/collections"),
    ("https://amxsigns.com/cart?resume=true", "https://amxsigns.com/collections")
]

# Process scratch templates 1 to 9
for i in range(1, 10):
    template_path = f'c:/Users/akib/Desktop/amx signs/scratch/template_{i}.html'
    if os.path.exists(template_path):
        replace_in_file(template_path, replacements_html)

# Process specification file
spec_path = 'c:/Users/akib/Desktop/amx signs/email_templates_specification.md'
if os.path.exists(spec_path):
    replace_in_file(spec_path, replacements_html)

# Process send.ts
send_path = 'c:/Users/akib/Desktop/amx signs/src/lib/email/send.ts'
if os.path.exists(send_path):
    replace_in_file(send_path, [
        ("https://amxsigns.com/profile/orders", "https://amxsigns.com/profile")
    ])
