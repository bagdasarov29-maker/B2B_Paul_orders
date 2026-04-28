/* ═══════════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════════ */
const CONFIG = {
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxAWTDNs7HyB7gg1CZRq47jV7E4DDSev03TI1a9ZjduNFfzagLYrHHogmstCCdpAgLaHw/exec',
  TELEGRAM_BOT_TOKEN: '',
  TELEGRAM_CHAT_ID:   '', 
};

/* ═══════════════════════════════════════════════════
   PRICE LIST
═══════════════════════════════════════════════════ */
const PRODUCTS = [
  { name: "6 Cereal bread 400 g B2B", price: 500 },
  { name: "Bagels 5 mix seeds B2B", price: 160 },
  { name: "Bagels classic B2B", price: 150 },
  { name: "Bagels poppy seeds B2B", price: 210 },
  { name: "Bagels sesame B2B", price: 160 },
  { name: "Baguette blanche B2B", price: 290 },
  { name: "Baguette PAUL poppy seed B2B", price: 450 },
  { name: "Baguette PAUL sesame B2B", price: 370 },
  { name: "Burger Buns 120g B2B", price: 300 },
  { name: "Burger Buns 40g B2B", price: 120 },
  { name: "Burger Buns 80g B2B", price: 200 },
  { name: "Campagne bread B2B", price: 470 },
  { name: "Ciabatta 150g B2B", price: 170 },
  { name: "Ciabatta 250g B2B", price: 250 },
  { name: "Ciabatta 75g B2B", price: 60 },
  { name: "Court bread 0,400 B2B", price: 420 },
  { name: "Court bread 1kg B2B", price: 1050 },
  { name: "Crumb bread B2B", price: 150 },
  { name: "Flaxseed bread 400 g B2B", price: 500 },
  { name: "Flemish complet bread B2B", price: 420 },
  { name: "Hot dog bread 40g B2B", price: 100 },
  { name: "Multigrain bread 1kg B2B", price: 1500 },
  { name: "Multigrain bread 400g B2B", price: 790 },
  { name: "Nordique bread B2B", price: 580 },
  { name: "Platine bread B2B", price: 400 },
  { name: "Polka bread Paul 400 B2B", price: 400 },
  { name: "Rye bread B2B", price: 600 },
  { name: "Salted focacia bread B2B", price: 1600 },
  { name: "Soup bread 400g B2B", price: 440 },
  { name: "SW Charlemange 100g bread B2B", price: 0 },
  { name: "SW Charlemange 130 g bread B2B", price: 150 },
  { name: "SW Charlemange Poppy Seed 130 g bread B2B", price: 210 },
  { name: "SW Charlemange Sesame 130 g bread B2B", price: 150 },
  { name: "SW Curcuma 130 g bread B2B", price: 250 },
  { name: "SW Panini 130 g bread B2B", price: 100 },
  { name: "Toast Bread B2B", price: 1800 },
];

/* ═══════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════ */
let rowCounter = 0;

/* ═══════════════════════════════════════════════════
   DOM REFS
═══════════════════════════════════════════════════ */
const container     = document.getElementById('productsContainer');
const addBtn        = document.getElementById('addProductBtn');
const form          = document.getElementById('orderForm');
const summaryCard   = document.getElementById('summaryCard');
const summaryLines  = document.getElementById('summaryLines');
const summaryTotal  = document.getElementById('summaryTotal');
const submitBtn     = document.getElementById('submitBtn');
const submitLabel   = document.getElementById('submitLabel');
const submitSpinner = document.getElementById('submitSpinner');
const successScreen = document.getElementById('successScreen');

/* ═══════════════════════════════════════════════════
   PRODUCT ROW WITH SEARCH
═══════════════════════════════════════════════════ */
function addProductRow() {
  const id = ++rowCounter;

  const empty = container.querySelector('.no-products');
  if (empty) empty.remove();

  const row = document.createElement('div');
  row.className = 'product-row';
  row.dataset.id = id;
  row.innerHTML = `
    <div class="prod-search-wrap">
      <input
        type="text"
        class="prod-search"
        placeholder="Search product..."
        autocomplete="off"
      />
      <div class="prod-dropdown" style="display:none;">
        ${PRODUCTS.map((p, i) => `
          <div class="prod-option" data-idx="${i}">
            <span class="prod-option-name">${p.name}</span>
            <span class="prod-option-price">${p.price ? p.price.toLocaleString() + ' AMD' : '—'}</span>
          </div>
        `).join('')}
        <div class="prod-no-result" style="display:none;">Nothing found</div>
      </div>
      <input type="hidden" class="prod-value" value="" />
    </div>
    <input
      type="number"
      class="prod-qty"
      min="1"
      value="1"
      placeholder="Qty"
      aria-label="Quantity"
    />
    <button type="button" class="btn-remove" title="Remove">✕</button>
  `;

  container.appendChild(row);

  const searchInput = row.querySelector('.prod-search');
  const dropdown    = row.querySelector('.prod-dropdown');
  const hiddenVal   = row.querySelector('.prod-value');
  const qtyInput    = row.querySelector('.prod-qty');
  const noResult    = row.querySelector('.prod-no-result');

  // Открыть при фокусе
  searchInput.addEventListener('focus', () => {
    filterOptions(dropdown, noResult, searchInput.value);
    dropdown.style.display = 'block';
  });

  // Фильтрация при вводе
  searchInput.addEventListener('input', () => {
    hiddenVal.value = '';
    filterOptions(dropdown, noResult, searchInput.value);
    dropdown.style.display = 'block';
    updateSummary();
  });

  // Выбор продукта кликом
  dropdown.addEventListener('mousedown', (e) => {
    const option = e.target.closest('.prod-option');
    if (!option) return;
    const idx = parseInt(option.dataset.idx);
    const product = PRODUCTS[idx];
    searchInput.value = product.name;
    hiddenVal.value = idx;
    dropdown.style.display = 'none';
    updateSummary();
  });

  // Закрыть при потере фокуса
  searchInput.addEventListener('blur', () => {
    setTimeout(() => {
      dropdown.style.display = 'none';
      // Если текст не совпадает с выбранным продуктом — сбросить
      if (hiddenVal.value === '') searchInput.value = '';
    }, 150);
  });

  qtyInput.addEventListener('input', updateSummary);

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

function filterOptions(dropdown, noResult, query) {
  const q = query.toLowerCase().trim();
  const options = dropdown.querySelectorAll('.prod-option');
  let hasVisible = false;

  options.forEach(opt => {
    const name = opt.querySelector('.prod-option-name').textContent.toLowerCase();
    const match = !q || name.includes(q);
    opt.style.display = match ? 'flex' : 'none';
    if (match) hasVisible = true;
  });

  noResult.style.display = hasVisible ? 'none' : 'block';
}

function showEmpty() {
  container.innerHTML = '<div class="no-products">No products added yet</div>';
}

/* ═══════════════════════════════════════════════════
   GET ROWS DATA
═══════════════════════════════════════════════════ */
function getProductRows() {
  return Array.from(container.querySelectorAll('.product-row')).map(row => {
    const hiddenVal = row.querySelector('.prod-value');
    const qty = parseInt(row.querySelector('.prod-qty').value) || 1;
    const idx = parseInt(hiddenVal.value);
    const product = isNaN(idx) ? null : PRODUCTS[idx];
    return {
      name:      product ? product.name  : '',
      unitPrice: product ? product.price : 0,
      qty,
    };
  }).filter(r => r.name);
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
   VALIDATION
═══════════════════════════════════════════════════ */
function validateForm() {
  let valid = true;

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

  if (!getProductRows().length) {
    alert('Please add at least one product.');
    valid = false;
  }

  return valid;
}

/* ═══════════════════════════════════════════════════
   SEND TO GOOGLE SHEETS
═══════════════════════════════════════════════════ */
async function sendToSheets(data) {
  await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
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

  submitBtn.disabled = true;
  submitLabel.style.display = 'none';
  submitSpinner.style.display = 'inline-block';

  const data = {
    timestamp:     new Date().toISOString(),
    client_name:   document.getElementById('client_name').value.trim(),
    phone:         document.getElementById('phone').value.trim(),
    client_type:   document.getElementById('client_type').value,
    delivery_date: document.getElementById('delivery_date').value,
    comment:       document.getElementById('comment').value.trim(),
    products:      getProductRows(),
  };

  try {
    await sendToSheets(data);
  } catch (err) {
    console.error('Submit error:', err);
  }

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
  addProductRow();
}

/* ═══════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════ */
addBtn.addEventListener('click', addProductRow);
document.getElementById('delivery_date').min = new Date().toISOString().split('T')[0];
showEmpty();
addProductRow();
