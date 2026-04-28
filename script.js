/* ═══════════════════════════════════════════════════
   CONFIG — заполни перед деплоем
═══════════════════════════════════════════════════ */
const CONFIG = {
  // Google Apps Script Web App URL (инструкция в README)
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxAWTDNs7HyB7gg1CZRq47jV7E4DDSev03TI1a9ZjduNFfzagLYrHHogmstCCdpAgLaHw/exec',

  // Telegram Bot
  TELEGRAM_BOT_TOKEN: '',
  TELEGRAM_CHAT_ID:   '',
};

/* ═══════════════════════════════════════════════════
   PRICE LIST — B2B base prices
   Prices by client type handled server-side via Sheets
═══════════════════════════════════════════════════ */
const PRODUCTS = [
  { name: "6 Cereal bread 400 g B2B", price: 500 },
  { name: "Bagels 5 mix seeds B2B", price: 160 },
  { name: "Bagels classic B2B", price: 150 },
  { name: "Bagels poppy seeds B2B", price: 210 },
  { name: "Bagels sesame B2B", price: 160 },
  { name: "Baguette blanche B2B", price: 290 },
  { name: "Baguette multigraine B2B", price: 500 },
  { name: "Baguette nordique B2B", price: 450 },
  { name: "Baguette PAUL B2B", price: 280 },
  { name: "Baguette PAUL poppy seed B2B", price: 450 },
  { name: "Baguette PAUL sesame B2B", price: 370 },
  { name: "Benoiton with bacon B2B", price: 150 },
  { name: "Benoiton with cheese B2B", price: 150 },
  { name: "Benoiton with muesli B2B", price: 120 },
  { name: "Benoiton with olives B2B", price: 180 },
  { name: "Big baguette blanche B2B", price: 450 },
  { name: "Bread with muesli B2B", price: 800 },
  { name: "Bread with walnut B2B", price: 850 },
  { name: "Burger Buns 120g B2B", price: 300 },
  { name: "Burger Buns 40g B2B", price: 120 },
  { name: "Burger Buns 80g B2B", price: 200 },
  { name: "Campagne bread / Santafe/", price: 700 },
  { name: "Campagne bread B2B", price: 470 },
  { name: "Ciabatta 150g B2B", price: 170 },
  { name: "Ciabatta 250g B2B", price: 250 },
  { name: "Ciabatta 75g B2B", price: 60 },
  { name: "Court bread 0,400 B2B", price: 420 },
  { name: "Court bread 1kg B2B", price: 1050 },
  { name: "Crumb bread B2B", price: 150 },
  { name: "Flaxseed bread 400 g B2B", price: 500 },
  { name: "Flemish complet bread B2B", price: 420 },
  { name: "Fougasse with bacon B2B", price: 600 },
  { name: "Fougasse with cheese B2B", price: 750 },
  { name: "Fougasse with olives B2B", price: 600 },
  { name: "Grissini 1kg B2B", price: 1900 },
  { name: "Hokaido bread B2B", price: 1200 },
  { name: "Hot dog bread 40g B2B", price: 100 },
  { name: "Multigrain bread 1kg B2B", price: 1500 },
  { name: "Multigrain bread 400g B2B", price: 790 },
  { name: "Nordique bread B2B", price: 580 },
  { name: "Pain Court 1 kg B2B", price: 0 },
  { name: "Platine bread B2B", price: 400 },
  { name: "Polka bread Paul 400 B2B", price: 400 },
  { name: "PREPA CIABATTA BREAD B2B", price: 0 },
  { name: "Rye bread B2B", price: 600 },
  { name: "Salted focacia bread B2B", price: 1600 },
  { name: "Seeds B2B", price: 3700 },
  { name: "Simple bread B2B", price: 80 },
  { name: "Small bread with bacon B2B", price: 210 },
  { name: "Small bread with cheese B2B", price: 140 },
  { name: "Small bread with muesli B2B", price: 120 },
  { name: "Small bread with olives 40g B2B", price: 150 },
  { name: "Small bread with walnut B2B", price: 150 },
  { name: "Soup bread 400g B2B", price: 440 },
  { name: "SW Charlemange 100g bread B2B", price: 0 },
  { name: "SW Charlemange 130 g bread B2B", price: 150 },
  { name: "SW Charlemange 30 g bread B2B", price: 0 },
  { name: "SW Charlemange 65g bread B2B", price: 60 },
  { name: "SW Charlemange 75g bread B2B", price: 0 },
  { name: "SW Charlemange Poppy Seed 130 g bread B2B", price: 210 },
  { name: "SW Charlemange Sesame 130 g bread B2B", price: 150 },
  { name: "SW Curcuma 130 g bread B2B", price: 250 },
  { name: "SW Multigraine 130 g bread B2B", price: 150 },
  { name: "SW Panini 130 g bread B2B", price: 100 },
  { name: "SW Polka Olives 130 g bread B2B", price: 300 },
  { name: "SW Polka Olives 40g bread B2B", price: 80 },
  { name: "SW Polka red bell pepper 40g bread B2B", price: 70 },
  { name: "Toast Bread B2B", price: 1800 },
  { name: "Toast bread small B2B", price: 50 },
  { name: "Vegetarian Black Bread B2B", price: 400 },
  { name: "Vegetarian Bread B2B", price: 400 },
  { name: "Prepa Pain Court 1 kg", price: 900 },
  { name: "Prepa Toast bread 1 kg", price: 1000 },
  { name: "Prepa Baguette poppy seeds SW 130 g", price: 160 },
  { name: "Prepa hotdog bread 80g", price: 150 },
  { name: "Prepa Baguette blanche SW 130 g", price: 110 },
];

/* ═══════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════ */
let rowCounter = 0;

/* ═══════════════════════════════════════════════════
   DOM REFS
═══════════════════════════════════════════════════ */
const container    = document.getElementById('productsContainer');
const addBtn       = document.getElementById('addProductBtn');
const form         = document.getElementById('orderForm');
const summaryCard  = document.getElementById('summaryCard');
const summaryLines = document.getElementById('summaryLines');
const summaryTotal = document.getElementById('summaryTotal');
const submitBtn    = document.getElementById('submitBtn');
const submitLabel  = document.getElementById('submitLabel');
const submitSpinner= document.getElementById('submitSpinner');
const successScreen= document.getElementById('successScreen');

/* ═══════════════════════════════════════════════════
   BUILD PRODUCT ROW
═══════════════════════════════════════════════════ */
function buildSelectOptions() {
  return PRODUCTS.map((p, i) =>
    `<option value="${i}">${p.name}${p.price ? ' — ' + p.price.toLocaleString() + ' AMD' : ''}</option>`
  ).join('');
}

function addProductRow() {
  const id = ++rowCounter;

  // remove empty placeholder
  const empty = container.querySelector('.no-products');
  if (empty) empty.remove();

  const row = document.createElement('div');
  row.className = 'product-row';
  row.dataset.id = id;
  row.innerHTML = `
    <select class="prod-select" data-rowid="${id}" aria-label="Product">
      <option value="" disabled selected>Select product...</option>
      ${buildSelectOptions()}
    </select>
    <input
      type="number"
      class="prod-qty"
      data-rowid="${id}"
      min="1"
      value="1"
      placeholder="Qty"
      aria-label="Quantity"
    />
    <button type="button" class="btn-remove" data-rowid="${id}" title="Remove">✕</button>
  `;

  container.appendChild(row);

  // events
  row.querySelector('.prod-select').addEventListener('change', updateSummary);
  row.querySelector('.prod-qty').addEventListener('input', updateSummary);
  row.querySelector('.btn-remove').addEventListener('click', () => {
    row.style.opacity = '0';
    row.style.transform = 'translateX(-8px)';
    row.style.transition = 'opacity .15s, transform .15s';
    setTimeout(() => {
      row.remove();
      if (!container.querySelector('.product-row')) showEmpty();
      updateSummary();
    }, 150);
  });

  updateSummary();
}

function showEmpty() {
  container.innerHTML = `<div class="no-products">No products added yet</div>`;
}

/* ═══════════════════════════════════════════════════
   SUMMARY
═══════════════════════════════════════════════════ */
function updateSummary() {
  const rows = getProductRows();
  if (!rows.length) {
    summaryCard.style.display = 'none';
    return;
  }

  let html = '';
  let total = 0;

  rows.forEach(({ name, qty, unitPrice }) => {
    if (!name) return;
    const sub = unitPrice * qty;
    total += sub;
    html += `<div class="summary-line">
      <span>${name} × ${qty}</span>
      <strong>${sub.toLocaleString()} AMD</strong>
    </div>`;
  });

  if (!html) { summaryCard.style.display = 'none'; return; }

  summaryLines.innerHTML = html;
  summaryTotal.textContent = total.toLocaleString() + ' AMD';
  summaryCard.style.display = 'block';
}

/* ═══════════════════════════════════════════════════
   GET ROWS DATA
═══════════════════════════════════════════════════ */
function getProductRows() {
  return Array.from(container.querySelectorAll('.product-row')).map(row => {
    const sel = row.querySelector('.prod-select');
    const qty = parseInt(row.querySelector('.prod-qty').value) || 1;
    const idx = parseInt(sel.value);
    const product = isNaN(idx) ? null : PRODUCTS[idx];
    return {
      name:      product ? product.name : '',
      unitPrice: product ? product.price : 0,
      qty,
    };
  }).filter(r => r.name);
}

/* ═══════════════════════════════════════════════════
   VALIDATION
═══════════════════════════════════════════════════ */
function validateForm() {
  let valid = true;

  // required text inputs
  ['client_name', 'phone', 'delivery_date'].forEach(id => {
    const el = document.getElementById(id);
    const field = el.closest('.field');
    if (!el.value.trim()) {
      el.classList.add('invalid');
      field.classList.add('has-error');
      valid = false;
    } else {
      el.classList.remove('invalid');
      field.classList.remove('has-error');
    }
  });

  // client type
  const ct = document.getElementById('client_type');
  const ctField = ct.closest('.field');
  if (!ct.value) {
    ct.classList.add('invalid');
    ctField.classList.add('has-error');
    valid = false;
  } else {
    ct.classList.remove('invalid');
    ctField.classList.remove('has-error');
  }

  // at least 1 product
  if (!getProductRows().length) {
    alert('Please add at least one product.');
    valid = false;
  }

  return valid;
}

/* ═══════════════════════════════════════════════════
   BUILD TELEGRAM MESSAGE
═══════════════════════════════════════════════════ */
function buildTelegramMessage(data) {
  const now = new Date().toLocaleString('en-GB');
  const productLines = data.products
    .map(p => `  • ${p.name} × ${p.qty} = ${(p.unitPrice * p.qty).toLocaleString()} AMD`)
    .join('\n');

  const total = data.products.reduce((s, p) => s + p.unitPrice * p.qty, 0);

  return `🆕 NEW ORDER

👤 Client: ${data.client_name}
📱 Phone: ${data.phone}
🏷 Type: ${data.client_type}
📅 Delivery: ${data.delivery_date}
💬 Comment: ${data.comment || '—'}

🍞 Products:
${productLines}

💳 Total: ${total.toLocaleString()} AMD
⏰ Received: ${now}`;
}

/* ═══════════════════════════════════════════════════
   SEND TO TELEGRAM
═══════════════════════════════════════════════════ */
async function sendTelegram(text) {
  if (CONFIG.TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') return; // skip if not configured

  await fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CONFIG.TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
    }),
  });
}

/* ═══════════════════════════════════════════════════
   SEND TO GOOGLE SHEETS (via Apps Script)
═══════════════════════════════════════════════════ */
async function sendToSheets(data) {
  if (CONFIG.GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') return; // skip if not configured

  await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors', // Apps Script doesn't send CORS headers by default
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

/* ═══════════════════════════════════════════════════
   SUBMIT
═══════════════════════════════════════════════════ */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  // loading state
  submitBtn.disabled = true;
  submitLabel.style.display = 'none';
  submitSpinner.style.display = 'inline-block';

  const data = {
    timestamp:    new Date().toISOString(),
    client_name:  document.getElementById('client_name').value.trim(),
    phone:        document.getElementById('phone').value.trim(),
    client_type:  document.getElementById('client_type').value,
    delivery_date:document.getElementById('delivery_date').value,
    comment:      document.getElementById('comment').value.trim(),
    products:     getProductRows(),
  };

  try {
    const message = buildTelegramMessage(data);
    await Promise.all([
      sendTelegram(message),
      sendToSheets(data),
    ]);
  } catch (err) {
    console.error('Submit error:', err);
    // still show success to user — data may have partially submitted
  }

  // show success
  form.style.display = 'none';
  successScreen.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ═══════════════════════════════════════════════════
   RESET
═══════════════════════════════════════════════════ */
function resetForm() {
  form.reset();
  container.innerHTML = '';
  showEmpty();
  summaryCard.style.display = 'none';
  submitBtn.disabled = false;
  submitLabel.style.display = 'inline';
  submitSpinner.style.display = 'none';
  form.style.display = 'block';
  successScreen.style.display = 'none';
  rowCounter = 0;
  addProductRow(); // start with one row
}

/* ═══════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════ */
addBtn.addEventListener('click', addProductRow);

// set min date = today
document.getElementById('delivery_date').min = new Date().toISOString().split('T')[0];

// start with one row
showEmpty();
addProductRow();
