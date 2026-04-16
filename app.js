/* ═══════════════════════════════════════════════════════════════
   L.Y. Sweet & Fancy House — app.js
   Sections: Pooja Builder → Cart Counter → Products →
             Tabs → History → Helpers (menu, toast, scroll)
   ═══════════════════════════════════════════════════════════════ */

/* ─── STATE ──────────────────────────────────────────────────── */
const poojaChecked = {} // { itemId: boolean }
const poojaQty = {} // { itemId: number  }
const selectedExtras = new Set()
const productQtys = {} // { 'cat-index': number }

/* ─── INITIALISATION ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderPoojaBuilder()
  renderExtras()
  renderProducts()
  updateCartCount()
  // Active nav link on scroll
  observeNavLinks()
})

/* ─── POOJA BUILDER ──────────────────────────────────────────── */
function renderPoojaBuilder() {
  renderItemList('fruits-list', POOJA_FRUITS)
  renderItemList('sweets-list', POOJA_SWEETS)
  renderItemList('sacred-list', POOJA_SACRED)
}

function renderItemList(containerId, items) {
  const el = document.getElementById(containerId)
  if (!el) return
  el.innerHTML = items
    .map((item) => {
      // Start unchecked — user picks what they want
      poojaChecked[item.id] = false
      poojaQty[item.id] = item.default
      return `
      <div class="item-row" id="row-${item.id}">
        <input class="item-check"
               type="checkbox"
               id="chk-${item.id}"
               onchange="toggleItem('${item.id}')"
               aria-label="${item.name}">
        <div class="item-info">
          <div class="name">${item.name}</div>
          <div class="default">Default: ${item.default} ${item.unit}</div>
        </div>
        <div class="item-qty-ctrl" id="qty-ctrl-${item.id}" style="opacity:0.35;">
          <button class="item-qty-btn"
                  onclick="changeItemQty('${item.id}', -1)"
                  aria-label="Decrease">−</button>
          <div class="item-qty-display" id="iqty-${item.id}">${item.default}</div>
          <button class="item-qty-btn"
                  onclick="changeItemQty('${item.id}', 1)"
                  aria-label="Increase">+</button>
        </div>
        <div class="item-unit">${item.unit}</div>
      </div>`
    })
    .join('')
}

function toggleItem(id) {
  const chk = document.getElementById('chk-' + id)
  poojaChecked[id] = chk.checked
  // Dim qty controls when unchecked
  const ctrl = document.getElementById('qty-ctrl-' + id)
  if (ctrl) ctrl.style.opacity = chk.checked ? '1' : '0.35'
  updateSummary()
  updateCartCount()
}

function changeItemQty(id, delta) {
  if (!poojaQty[id]) poojaQty[id] = 1
  poojaQty[id] = Math.max(1, poojaQty[id] + delta)
  const el = document.getElementById('iqty-' + id)
  if (el) el.textContent = poojaQty[id]
  updateSummary()
}

function updateSummary() {
  const allItems = [...POOJA_FRUITS, ...POOJA_SWEETS, ...POOJA_SACRED]
  const selected = allItems.filter((i) => poojaChecked[i.id])
  const list = document.getElementById('summary-list')
  if (!list) return

  if (selected.length === 0) {
    list.innerHTML = `<div class="summary-empty">No items selected yet.<br>Check items on the left to get started.</div>`
    return
  }

  list.innerHTML = selected
    .map(
      (i) => `
    <div class="summary-item">
      <span class="item-n">${i.name}</span>
      <span class="item-q">${poojaQty[i.id]} ${i.unit}</span>
    </div>`,
    )
    .join('')
}

function updateCartCount() {
  const allItems = [...POOJA_FRUITS, ...POOJA_SWEETS, ...POOJA_SACRED]
  const count = allItems.filter((i) => poojaChecked[i.id]).length
  const badge = document.getElementById('cart-count')
  if (badge) badge.textContent = count
}

/* ─── EXTRAS ─────────────────────────────────────────────────── */
function renderExtras() {
  const grid = document.getElementById('extras-grid')
  if (!grid) return
  grid.innerHTML = EXTRAS.map(
    (e) => `
    <div class="extra-chip" id="extra-${e.id}" onclick="toggleExtra('${e.id}')">
      ${e.emoji} ${e.label}
    </div>`,
  ).join('')
}

function toggleExtra(id) {
  const chip = document.getElementById('extra-' + id)
  if (!chip) return
  if (selectedExtras.has(id)) {
    selectedExtras.delete(id)
    chip.classList.remove('selected')
  } else {
    selectedExtras.add(id)
    chip.classList.add('selected')
  }
}

/* ─── SEND ORDER ─────────────────────────────────────────────── */
function sendOrder() {
  const name = (document.getElementById('cust-name')?.value || '').trim()
  const phone = (document.getElementById('cust-phone')?.value || '').trim()
  const note = (document.getElementById('special-note')?.value || '').trim()

  if (!phone) {
    showToast('Please enter your phone number before sending.')
    return
  }

  const allItems = [...POOJA_FRUITS, ...POOJA_SWEETS, ...POOJA_SACRED]
  const selected = allItems.filter((i) => poojaChecked[i.id])

  if (selected.length === 0) {
    showToast('Please select at least one item for your Pooja Watti.')
    return
  }

  const extras = EXTRAS.filter((e) => selectedExtras.has(e.id))

  const lines = [
    '🪔 *NEW POOJA WATTI ORDER*',
    '----------------------------',
    `*Name:* ${name || '(not given)'}`,
    `*Phone:* ${phone}`,
    '----------------------------',
    '*Selected Items:*',
    ...selected.map((i) => `• ${i.name} — ${poojaQty[i.id]} ${i.unit}`),
  ]
  if (extras.length) {
    lines.push('', '*Add-ons:*', ...extras.map((e) => `• ${e.label}`))
  }
  if (note) {
    lines.push('', '*Special Note:*', note)
  }
  lines.push(
    '----------------------------',
    '_Sent from LY Sweet & Fancy House website_',
  )

  saveOrder({
    id: Date.now(),
    date: new Date().toLocaleString('en-LK'),
    name: name || '(not given)',
    phone,
    items: selected.map((i) => `${i.name} (${poojaQty[i.id]} ${i.unit})`),
    extras: extras.map((e) => e.label),
    note: note || '-',
  })

  const encoded = encodeURIComponent(lines.join('\n'))
  window.open(`https://wa.me/94767726820?text=${encoded}`, '_blank')
  showToast('Order sent! Your record has been saved under "My Orders".')
}

/* ─── PRODUCTS ───────────────────────────────────────────────── */
function renderProducts() {
  renderProductGrid('tab-sweets', SWEETS_PRODUCTS, 'sweets')
  renderProductGrid('tab-toys', TOYS_PRODUCTS, 'toys')
  renderProductGrid('tab-fancy', FANCY_PRODUCTS, 'fancy')
}

function renderProductGrid(containerId, products, cat) {
  const c = document.getElementById(containerId)
  if (!c) return
  c.innerHTML = products
    .map((p, i) => {
      const key = `${cat}-${i}`
      const imgBlock = p.img
        ? `<img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
         <span class="emoji-fallback" style="display:none;">${p.emoji}</span>`
        : `<span class="emoji-fallback">${p.emoji}</span>`

      return `
      <div class="product-card">
        <div class="product-img">
          ${imgBlock}
          ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
        </div>
        <div class="product-body">
          <div class="product-name">${p.name}</div>
          <div class="product-desc">${p.desc}</div>
          <div class="product-unit">${p.unit}</div>
          <div class="qty-row">
            <div class="qty-ctrl">
              <button class="qty-btn"
                      onclick="changeQty('${key}', -1)"
                      aria-label="Decrease quantity">−</button>
              <div class="qty-display" id="pqty-${key}">1</div>
              <button class="qty-btn"
                      onclick="changeQty('${key}', 1)"
                      aria-label="Increase quantity">+</button>
            </div>
            <button class="add-btn"
                    id="addbtn-${key}"
                    onclick="addToWhatsapp('${p.name.replace(/'/g, "\\'")}', '${key}')">
              <i class="fa-brands fa-whatsapp"></i> Order
            </button>
          </div>
        </div>
      </div>`
    })
    .join('')
}

function changeQty(id, delta) {
  if (!productQtys[id]) productQtys[id] = 1
  productQtys[id] = Math.max(1, productQtys[id] + delta)
  const el = document.getElementById('pqty-' + id)
  if (el) el.textContent = productQtys[id]
}

function addToWhatsapp(name, id) {
  const qty = productQtys[id] || 1
  const confirmed = confirm(
    `Send a WhatsApp inquiry to order:\n\n• ${name} — Qty: ${qty}\n\nThis will open WhatsApp with a pre-filled message.`,
  )
  if (!confirmed) return

  const msgText = `Hi! I would like to order:\n• ${name} — Qty: ${qty}\n\nPlease confirm availability and price. Thank you!`
  const encoded = encodeURIComponent(msgText)

  const btn = document.getElementById('addbtn-' + id)
  if (btn) {
    btn.classList.add('added')
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!'
    setTimeout(() => {
      btn.classList.remove('added')
      btn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Order'
    }, 2500)
  }
  window.open(`https://wa.me/94767726820?text=${encoded}`, '_blank')
}

/* ─── TABS ───────────────────────────────────────────────────── */
function showTab(tab) {
  ;['sweets', 'toys', 'fancy'].forEach((t) => {
    const el = document.getElementById('tab-' + t)
    if (el) el.style.display = t === tab ? 'grid' : 'none'
  })
  document.querySelectorAll('.tab[data-tab]').forEach((el) => {
    el.classList.toggle('active', el.dataset.tab === tab)
  })
  document
    .getElementById('products')
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ─── ORDER HISTORY ──────────────────────────────────────────── */
function getHistory() {
  try {
    return JSON.parse(localStorage.getItem('ly_orders')) || []
  } catch {
    return []
  }
}

function saveOrder(entry) {
  const h = getHistory()
  h.unshift(entry)
  localStorage.setItem('ly_orders', JSON.stringify(h))
}

function clearHistory() {
  if (confirm('Are you sure you want to delete all your saved orders?')) {
    localStorage.removeItem('ly_orders')
    showHistory()
  }
}

function showHistory() {
  const sec = document.getElementById('my-orders')
  if (!sec) return
  sec.style.display = 'block'
  requestAnimationFrame(() => sec.scrollIntoView({ behavior: 'smooth' }))

  const h = getHistory()
  const c = document.getElementById('history-list')
  if (!c) return

  if (h.length === 0) {
    c.innerHTML = `
      <div class="history-empty">
        <i class="fa-solid fa-clock-rotate-left"></i>
        No orders yet.<br>Your orders will appear here after you send your first inquiry.
      </div>`
    return
  }

  c.innerHTML = h
    .map(
      (e) => `
    <div class="history-card" style="margin-bottom:16px;">
      <div style="flex:1; min-width:0;">
        <span class="history-status">✓ Sent via WhatsApp</span>
        <div class="history-date">${e.date}</div>
        <div class="history-name">${e.name} · ${e.phone}</div>
        <div class="history-items">
          ${e.items.slice(0, 5).join(' · ')}${e.items.length > 5 ? ` · +${e.items.length - 5} more` : ''}
        </div>
        ${e.extras && e.extras.length ? `<div class="history-note">Extras: ${e.extras.join(', ')}</div>` : ''}
        ${e.note && e.note !== '-' ? `<div class="history-note">Note: "${e.note}"</div>` : ''}
      </div>
      <div class="history-card-actions">
        <a href="https://wa.me/94767726820" target="_blank"
           style="background:var(--gold); color:var(--deep); padding:10px 18px; border-radius:50px;
                  font-size:12px; font-weight:700; text-decoration:none; display:flex;
                  align-items:center; gap:6px; white-space:nowrap;">
          <i class="fa-brands fa-whatsapp"></i> Follow Up
        </a>
      </div>
    </div>`,
    )
    .join('')
}

/* ─── MOBILE MENU ────────────────────────────────────────────── */
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu')
  const btn = document.getElementById('hamburger')
  const isOpen = menu.classList.toggle('open')
  btn.setAttribute('aria-expanded', isOpen)
  const spans = btn.querySelectorAll('span')
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)'
    spans[1].style.opacity = '0'
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)'
    // Prevent body scroll when menu open
    document.body.style.overflow = 'hidden'
  } else {
    closeMobileMenu()
  }
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu')
  const btn = document.getElementById('hamburger')
  if (!menu) return
  menu.classList.remove('open')
  btn.setAttribute('aria-expanded', 'false')
  const spans = btn.querySelectorAll('span')
  spans[0].style.transform = ''
  spans[1].style.opacity = ''
  spans[2].style.transform = ''
  document.body.style.overflow = ''
}

/* ─── HELPERS ────────────────────────────────────────────────── */
function scrollToBuilder() {
  document
    .getElementById('pooja-builder')
    ?.scrollIntoView({ behavior: 'smooth' })
}

function showToast(msg) {
  const t = document.getElementById('toast')
  const m = document.getElementById('toast-msg')
  if (!t || !m) return
  m.textContent = msg
  t.classList.remove('hidden')
  clearTimeout(window._toastTimer)
  window._toastTimer = setTimeout(() => t.classList.add('hidden'), 3500)
}

/* Back-to-top FAB */
window.addEventListener('scroll', () => {
  const btn = document.getElementById('fab-top')
  if (btn) btn.classList.toggle('visible', window.scrollY > 400)
})

/* ─── ACTIVE NAV LINK ON SCROLL ──────────────────────────────── */
function observeNavLinks() {
  const sections = document.querySelectorAll('section[id]')
  const links = document.querySelectorAll('.nav-links a')
  if (!sections.length || !links.length) return

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((a) => {
            a.classList.toggle(
              'active',
              a.getAttribute('href') === '#' + e.target.id,
            )
          })
        }
      })
    },
    { rootMargin: '-40% 0px -55% 0px' },
  )

  sections.forEach((s) => io.observe(s))
}
