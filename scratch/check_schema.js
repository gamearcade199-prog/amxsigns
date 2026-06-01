const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }
    env[key] = value.trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRole = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRole) {
  console.error("Missing Supabase URL or Service Role Key");
  process.exit(1);
}

async function run() {
  console.log("Checking order_items table schema using REST API...");

  // Let's fetch one row from order_items
  const res = await fetch(`${supabaseUrl}/rest/v1/order_items?limit=1`, {
    headers: {
      'apikey': supabaseServiceRole,
      'Authorization': `Bearer ${supabaseServiceRole}`,
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    console.error("Failed to fetch order_items:", await res.text());
  } else {
    const data = await res.json();
    console.log("Single row from order_items:", data);
  }

  // Let's perform a test POST request to check if custom_details column exists
  const dummyItem = {
    order_id: '00000000-0000-0000-0000-000000000000',
    product_id: '00000000-0000-0000-0000-000000000000',
    quantity: 1,
    price_at_purchase: 0,
    selected_size: 'Regular',
    custom_details: { test: true }
  };

  const postRes = await fetch(`${supabaseUrl}/rest/v1/order_items`, {
    method: 'POST',
    headers: {
      'apikey': supabaseServiceRole,
      'Authorization': `Bearer ${supabaseServiceRole}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(dummyItem)
  });

  console.log("Insert test response status:", postRes.status);
  const text = await postRes.text();
  console.log("Insert test response body:", text);
}

run();
