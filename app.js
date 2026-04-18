// ============================================================
//  LY SWEET & FANCY HOUSE — FULLY FIXED APP
//  With Phone Number 1 & Phone Number 2
// ============================================================

const DB_KEY = 'ly_orders'

// ========== ORDER STORAGE ==========
function getAllOrders() {
  try {
    const stored = localStorage.getItem(DB_KEY)
    if (
      !stored ||
      stored === 'null' ||
      stored === 'undefined' ||
      stored === ''
    ) {
      return []
    }
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.error('Error loading orders:', e)
    return []
  }
}

function saveOrder(order) {
  try {
    const orders = getAllOrders()
    orders.unshift(order)
    localStorage.setItem(DB_KEY, JSON.stringify(orders))
    console.log('Order saved:', order.id)
    return true
  } catch (e) {
    console.error('Error saving order:', e)
    return false
  }
}

function generateOrderId() {
  const now = new Date()
  const yy = String(now.getFullYear()).slice(2)
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `LY-${yy}${mm}${dd}-${rand}`
}

// ========== CART STATE ==========
let cart = {}

function cartAdd(id) {
  cart[id] = (cart[id] || 0) + 1
  renderCart()
}

function cartRemove(id) {
  if (!cart[id]) return
  cart[id]--
  if (cart[id] <= 0) delete cart[id]
  renderCart()
}

function cartSet(id, qty) {
  qty = parseInt(qty)
  if (isNaN(qty) || qty <= 0) {
    delete cart[id]
  } else {
    cart[id] = qty
  }
  renderCart()
}

function cartClear() {
  cart = {}
  renderCart()
}

function cartTotal() {
  let total = 0
  for (const [id, qty] of Object.entries(cart)) {
    const p = ALL_PRODUCTS.find((x) => x.id === id)
    if (!p) continue
    total += p.price * qty
    if (p.hasBandesiya) {
      total += CONFIG.bandesiyaDeposit * qty
    }
  }
  return total
}

function cartItems() {
  return Object.entries(cart)
    .map(([id, qty]) => {
      const p = ALL_PRODUCTS.find((x) => x.id === id)
      if (!p) return null
      return { ...p, qty }
    })
    .filter((x) => x)
}

// ========== WHATSAPP MESSAGE ==========
function buildWhatsAppMsg(
  orderId,
  customerName,
  userId,
  phone1,
  phone2,
  address,
  items,
  total,
  note,
) {
  const dateStr = new Date().toLocaleString('en-LK', {
    timeZone: 'Asia/Colombo',
  })
  let lines = []
  lines.push(`🛕 *LY Sweet & Fancy House — New Order*`)
  lines.push(``)
  lines.push(`Order ID: *${orderId}*`)
  lines.push(`Date: ${dateStr}`)
  lines.push(`Customer: *${customerName}*`)
  lines.push(`User ID: *${userId}*`)
  lines.push(`Phone 1: *${phone1}*`)
  lines.push(`Phone 2: *${phone2}*`)
  if (address) lines.push(`Address: ${address}`)
  lines.push(``)
  lines.push(`*Items:*`)

  for (const item of items) {
    let line = `• ${item.name} x${item.qty} — Rs. ${(item.price * item.qty).toLocaleString()}`
    if (item.hasBandesiya) {
      line += `\n  ↳ 🏺 Bandesiya deposit: Rs. ${(CONFIG.bandesiyaDeposit * item.qty).toLocaleString()} included (refundable on return)`
    }
    lines.push(line)
  }

  lines.push(``)
  lines.push(`*Total: Rs. ${total.toLocaleString()}*`)
  if (note) lines.push(`Note: ${note}`)
  lines.push(``)
  lines.push(`Please confirm this order. Thank you! 🙏`)
  return lines.join('\n')
}

function sendWhatsApp(msg) {
  const encoded = encodeURIComponent(msg)
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encoded}`
  window.open(url, '_blank')
}

// ========== ORDER SLIP DOWNLOAD ==========
function downloadSlip(order) {
  const itemRows = order.items
    .map((item) => {
      const subtotal = item.price * item.qty
      let extras = ''
      if (item.hasBandesiya) {
        extras = `<div class="slip-note">🏺 Bandesiya deposit Rs. ${CONFIG.bandesiyaDeposit * item.qty} included (refundable on return)</div>`
      }
      return `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td class="center">${item.qty}</td>
          <td class="right">Rs. ${item.price.toLocaleString()}</td>
          <td class="right">Rs. ${subtotal.toLocaleString()}</td>
        </tr>
        ${extras ? `<tr><td colspan="4">${extras}</td></tr>` : ''}
      `
    })
    .join('')

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Order Slip — ${order.id}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', sans-serif; background: #fff; color: #222; }
  .slip { max-width: 550px; margin: 30px auto; padding: 32px; border: 2px solid #c084fc; border-radius: 20px; }
  .slip-header { text-align: center; margin-bottom: 20px; }
  .slip-header h1 { font-size: 22px; color: #7c3aed; font-weight: 700; }
  .slip-header p { font-size: 12px; color: #666; margin-top: 4px; }
  .slip-meta { background: #f5f3ff; border-radius: 12px; padding: 12px 16px; margin-bottom: 20px; font-size: 13px; }
  .slip-meta div { display: flex; justify-content: space-between; padding: 3px 0; }
  .slip-meta span { color: #555; }
  .slip-meta strong { color: #222; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 16px; }
  th { background: #7c3aed; color: #fff; padding: 8px 10px; text-align: left; }
  th.center { text-align: center; }
  th.right { text-align: right; }
  td { padding: 8px 10px; border-bottom: 1px solid #ede9fe; }
  td.center { text-align: center; }
  td.right { text-align: right; }
  .slip-note { font-size: 11px; color: #7c3aed; padding: 2px 0 4px; }
  .slip-total { display: flex; justify-content: flex-end; gap: 20px; font-size: 15px; font-weight: 700; color: #7c3aed; background: #f5f3ff; padding: 12px 16px; border-radius: 12px; }
  .slip-bandesiya { background: #fef9c3; border: 1px solid #fde047; border-radius: 12px; padding: 10px 14px; font-size: 12px; color: #713f12; margin-top: 12px; }
  .slip-footer { text-align: center; font-size: 11px; color: #999; margin-top: 20px; border-top: 1px dashed #ddd; padding-top: 14px; }
  .status-badge { display: inline-block; padding: 3px 12px; border-radius: 99px; font-size: 12px; font-weight: 600; }
  .status-pending { background: #fef9c3; color: #854d0e; }
  .status-confirmed { background: #dcfce7; color: #166534; }
  .status-delivered { background: #ede9fe; color: #5b21b6; }
  @media print { body { background: #fff; } .no-print { display: none; } }
</style>
</head>
<body>
<div class="slip">
  <div class="slip-header">
    <h1>🪷 LY Sweet &amp; Fancy House</h1>
    <p>${CONFIG.address}</p>
    <p>Tel: ${CONFIG.phone}</p>
  </div>
  <div class="slip-meta">
    <div><span>Order ID</span><strong>${order.id}</strong></div>
    <div><span>Date</span><strong>${order.date}</strong></div>
    <div><span>Customer</span><strong>${escapeHtml(order.customerName)}</strong></div>
    <div><span>User ID</span><strong>${escapeHtml(order.userId || '—')}</strong></div>
    <div><span>Phone 1</span><strong>${escapeHtml(order.phone1 || '—')}</strong></div>
    <div><span>Phone 2</span><strong>${escapeHtml(order.phone2 || '—')}</strong></div>
    ${order.address ? `<div><span>Delivery Address</span><strong>${escapeHtml(order.address)}</strong></div>` : ''}
    <div><span>Status</span><span class="status-badge status-${order.status || 'pending'}">${(order.status || 'PENDING').toUpperCase()}</span></div>
  </div>
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th class="center">Qty</th>
        <th class="right">Unit Price</th>
        <th class="right">Subtotal</th>
      </tr>
    </thead>
    <tbody>${itemRows}</tbody>
  </table>
  <div class="slip-total">
    <span>TOTAL</span>
    <span>Rs. ${order.total.toLocaleString()}</span>
  </div>
  ${
    order.hasBandesiyaItems
      ? `
  <div class="slip-bandesiya">
    ⚠️ <strong>Bandesiya Deposit:</strong> Rs. 500 deposit included per wattiya. 
    Bandesiya return karalath Rs. 500 refund labenna puluwan.
  </div>`
      : ''
  }
  ${order.note ? `<div style="margin-top:12px;font-size:13px;color:#555;"><strong>Note:</strong> ${escapeHtml(order.note)}</div>` : ''}
  <div class="slip-footer">
    <p>LY Sweet &amp; Fancy House — Thank you for your order! 🙏</p>
    <p>WhatsApp: ${CONFIG.phone} | <a href="${CONFIG.mapsUrl}">View Location</a></p>
  </div>
</div>
<div class="no-print" style="text-align:center;margin:20px;">
  <button onclick="window.print()" style="background:#7c3aed;color:#fff;border:none;padding:12px 32px;border-radius:99px;font-size:15px;cursor:pointer;font-weight:600;">🖨️ Print / Save PDF</button>
  <button onclick="window.close()" style="background:#f3f4f6;color:#333;border:none;padding:12px 32px;border-radius:99px;font-size:15px;cursor:pointer;margin-left:12px;">Close</button>
</div>
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
  setTimeout(() => URL.revokeObjectURL(url), 10000)
}

// ========== RENDER CART ==========
function renderCart() {
  const cartBadge = document.getElementById('cart-badge')
  const cartEmpty = document.getElementById('cart-empty')
  const cartContent = document.getElementById('cart-content')
  const cartTotalEl = document.getElementById('cart-total')

  const items = cartItems()
  const total = cartTotal()
  const count = items.reduce((s, i) => s + i.qty, 0)

  if (cartBadge) {
    cartBadge.textContent = count
    cartBadge.style.display = count > 0 ? 'flex' : 'none'
  }

  if (!cartContent) return

  if (items.length === 0) {
    cartEmpty.style.display = 'block'
    cartContent.style.display = 'none'
    if (cartTotalEl) cartTotalEl.textContent = 'Rs. 0'
    return
  }

  cartEmpty.style.display = 'none'
  cartContent.style.display = 'block'

  let html = ''
  for (const item of items) {
    const lineTotal =
      item.price * item.qty +
      (item.hasBandesiya ? CONFIG.bandesiyaDeposit * item.qty : 0)
    html += `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-top">
          <span class="cart-item-emoji">${item.emoji || '🪷'}</span>
          <div class="cart-item-info">
            <div class="cart-item-name">${escapeHtml(item.name)}</div>
            <div class="cart-item-price">Rs. ${item.price.toLocaleString()} each</div>
          </div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="cartRemove('${item.id}')">−</button>
            <input class="qty-input" type="number" min="1" value="${item.qty}" onchange="cartSet('${item.id}', this.value)" />
            <button class="qty-btn" onclick="cartAdd('${item.id}')">+</button>
          </div>
        </div>
        ${
          item.hasBandesiya
            ? `
        <div class="bandesiya-row">
          <span class="deposit-tag">🏺 Bandesiya deposit: Rs. ${(CONFIG.bandesiyaDeposit * item.qty).toLocaleString()} included (refundable on return)</span>
        </div>`
            : ''
        }
        <div class="cart-item-subtotal">Subtotal: Rs. ${lineTotal.toLocaleString()}</div>
      </div>`
  }

  cartContent.innerHTML = html
  if (cartTotalEl) cartTotalEl.textContent = `Rs. ${total.toLocaleString()}`
}

// ========== SUBMIT ORDER ==========
function submitOrder(e) {
  e.preventDefault()
  const items = cartItems()
  if (!items.length) {
    alert('Cart is empty! Add some items first.')
    return
  }

  const customerName = document.getElementById('order-name').value.trim()
  const userId = document.getElementById('order-user-id').value.trim()
  const phone1 = document.getElementById('order-phone1').value.trim()
  const phone2 = document.getElementById('order-phone2').value.trim()
  const address = document.getElementById('order-address').value.trim()
  const note = document.getElementById('order-note').value.trim()

  if (!customerName) {
    alert('Please enter your name!')
    return
  }
  if (!userId) {
    alert('Please enter your User ID (NIC / Passport / Driving License)!')
    return
  }
  if (!phone1) {
    alert('Please enter your Phone Number 1 (WhatsApp)!')
    return
  }
  if (!phone2) {
    alert('Please enter your Phone Number 2 (Alternative / Family)!')
    return
  }

  const orderId = generateOrderId()
  const total = cartTotal()
  const hasBandesiyaItems = items.some((i) => i.hasBandesiya)
  const dateStr = new Date().toLocaleString('en-LK', {
    timeZone: 'Asia/Colombo',
  })

  const order = {
    id: orderId,
    date: dateStr,
    customerName: customerName,
    userId: userId,
    phone1: phone1,
    phone2: phone2,
    address: address || '',
    note: note || '',
    items: items,
    total: total,
    hasBandesiyaItems: hasBandesiyaItems,
    status: 'pending',
  }

  saveOrder(order)

  const msg = buildWhatsAppMsg(
    orderId,
    customerName,
    userId,
    phone1,
    phone2,
    address,
    items,
    total,
    note,
  )
  sendWhatsApp(msg)

  closeOrderModal()
  showConfirmation(order)
  cartClear()
}

function showConfirmation(order) {
  const modal = document.getElementById('confirm-modal')
  const idEl = document.getElementById('confirm-order-id')
  const dlBtn = document.getElementById('confirm-download')
  if (idEl) idEl.textContent = order.id
  if (dlBtn) dlBtn.onclick = () => downloadSlip(order)
  if (modal) modal.style.display = 'flex'
}

// ========== ORDER HISTORY ==========
function renderHistory() {
  const container = document.getElementById('history-list')
  if (!container) return

  const orders = getAllOrders()

  if (!orders || orders.length === 0) {
    container.innerHTML = `<div class="history-empty" style="text-align:center;padding:40px;color:#6b7280;">📭 No orders found. Place your first order!</div>`
    return
  }

  container.innerHTML = orders
    .map((order) => {
      const orderStatus = order.status || 'pending'
      return `
      <div class="history-card">
        <div class="history-top">
          <div>
            <div class="history-id">🔖 ${order.id}</div>
            <div class="history-date">📅 ${order.date}</div>
            <div class="history-customer">👤 ${escapeHtml(order.customerName)} ${order.userId ? '· 🆔 ' + escapeHtml(order.userId) : ''}<br>📱 ${escapeHtml(order.phone1 || '—')} / ${escapeHtml(order.phone2 || '—')}</div>
          </div>
          <div class="history-right">
            <span class="status-badge status-${orderStatus}">${orderStatus.toUpperCase()}</span>
            <div class="history-total">💰 Rs. ${order.total.toLocaleString()}</div>
          </div>
        </div>
        <div class="history-items">
          ${order.items.map((i) => `<span class="history-item-tag">${i.emoji || '🪷'} ${escapeHtml(i.name)} x${i.qty}</span>`).join('')}
        </div>
        <div class="history-actions">
          <button class="btn-slip" onclick='downloadSlip(${JSON.stringify(order).replace(/'/g, '&#39;')})'>📥 Download Slip</button>
          <button class="btn-whatsapp-resend" onclick='resendWhatsApp(${JSON.stringify(order).replace(/'/g, '&#39;')})'>📲 WhatsApp Resend</button>
          <select class="status-select" onchange="updateStatus('${order.id}', this.value)">
            <option value="pending" ${orderStatus === 'pending' ? 'selected' : ''}>⏳ Pending</option>
            <option value="confirmed" ${orderStatus === 'confirmed' ? 'selected' : ''}>✅ Confirmed</option>
            <option value="delivered" ${orderStatus === 'delivered' ? 'selected' : ''}>🚚 Delivered</option>
          </select>
        </div>
      </div>
    `
    })
    .join('')
}

function escapeHtml(str) {
  if (!str) return ''
  return str.replace(/[&<>]/g, function (m) {
    if (m === '&') return '&amp;'
    if (m === '<') return '&lt;'
    if (m === '>') return '&gt;'
    return m
  })
}

function updateStatus(orderId, newStatus) {
  const orders = getAllOrders()
  const idx = orders.findIndex((o) => o.id === orderId)
  if (idx === -1) return
  orders[idx].status = newStatus
  localStorage.setItem(DB_KEY, JSON.stringify(orders))
  renderHistory()
  showToast(`Order ${orderId} status updated to ${newStatus}`)
}

function resendWhatsApp(order) {
  const msg = buildWhatsAppMsg(
    order.id,
    order.customerName,
    order.userId || 'Not provided',
    order.phone1 || '—',
    order.phone2 || '—',
    order.address,
    order.items,
    order.total,
    order.note,
  )
  sendWhatsApp(msg)
  showToast(`WhatsApp message resent for ${order.id}`)
}

function searchHistory(term) {
  const cards = document.querySelectorAll('.history-card')
  const lower = term.toLowerCase()
  cards.forEach((card) => {
    const text = card.textContent.toLowerCase()
    card.style.display = text.includes(lower) ? '' : 'none'
  })
}

function showToast(message) {
  let toast = document.getElementById('custom-toast')
  if (!toast) {
    toast = document.createElement('div')
    toast.id = 'custom-toast'
    toast.style.cssText = `
      position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
      background: #1e1b4b; color: white; padding: 10px 20px;
      border-radius: 99px; font-size: 14px; z-index: 1000;
      opacity: 0; transition: opacity 0.3s; pointer-events: none;
    `
    document.body.appendChild(toast)
  }
  toast.textContent = message
  toast.style.opacity = '1'
  setTimeout(() => {
    toast.style.opacity = '0'
  }, 2000)
}

// ========== MODAL HELPERS ==========
function openOrderModal() {
  document.getElementById('order-modal').style.display = 'flex'
}
function closeOrderModal() {
  document.getElementById('order-modal').style.display = 'none'
}
function closeConfirmModal() {
  document.getElementById('confirm-modal').style.display = 'none'
}
function openCart() {
  document.getElementById('cart-sidebar').classList.add('open')
  document.getElementById('cart-overlay').classList.add('open')
}
function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open')
  document.getElementById('cart-overlay').classList.remove('open')
}
function openHistoryModal() {
  renderHistory()
  document.getElementById('history-modal').style.display = 'flex'
}
function closeHistoryModal() {
  document.getElementById('history-modal').style.display = 'none'
}

// ========== RENDER PRODUCTS ==========
function renderProducts() {
  renderCategory('pooja-grid', POOJA_WATTI)
  renderCategory('sweet-grid', SWEET_ITEMS)
  renderCategory('toy-grid', TOY_ITEMS)
}

function renderCategory(gridId, products) {
  const grid = document.getElementById(gridId)
  if (!grid) return

  grid.innerHTML = products
    .map((p) => {
      const hasImage = p.imageUrl && p.imageUrl.trim() !== ''
      return `
      <div class="product-card">
        ${hasImage ? `<img src="${p.imageUrl}" alt="${p.name}" class="product-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="product-emoji" style="display:none">${p.emoji || '🪷'}</div>` : `<div class="product-emoji">${p.emoji || '🪷'}</div>`}
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.description || ''}</div>
        ${p.details ? `<ul class="product-details">${p.details.map((d) => `<li>${d}</li>`).join('')}</ul>` : ''}
        ${p.hasBandesiya ? `<div class="bandesiya-notice">🏺 Bandesiya denna. Rs. ${CONFIG.bandesiyaDeposit} deposit included. Return karoth refund labenawa.</div>` : ''}
        <div class="product-footer">
          <div class="product-price">Rs. ${p.price.toLocaleString()}</div>
          <button class="add-btn" onclick="cartAdd('${p.id}'); animateBtn(this)">Add to Cart</button>
        </div>
      </div>
    `
    })
    .join('')
}

function animateBtn(btn) {
  btn.classList.add('added')
  setTimeout(() => btn.classList.remove('added'), 600)
}

// ========== GALLERY ==========
function renderGallery() {
  const grid = document.getElementById('gallery-grid')
  if (!grid || typeof GALLERY_IMAGES === 'undefined') return

  grid.innerHTML = GALLERY_IMAGES.map(
    (img, i) => `
    <div class="gallery-item" onclick="openLightbox(${i})">
      <img src="${img.src}" alt="${img.caption}" loading="lazy"
           onerror="this.closest('.gallery-item').style.display='none'" />
      <div class="gallery-caption">
        <span class="gallery-category">${img.category}</span>
        <span class="gallery-name">${img.caption}</span>
      </div>
    </div>`,
  ).join('')
}

function openLightbox(index) {
  const lb = document.getElementById('gallery-lightbox')
  if (!lb) return
  window._galleryIndex = index
  updateLightbox()
  lb.style.display = 'flex'
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  const lb = document.getElementById('gallery-lightbox')
  if (lb) lb.style.display = 'none'
  document.body.style.overflow = ''
}

function lightboxNav(dir) {
  window._galleryIndex =
    (window._galleryIndex + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
  updateLightbox()
}

function updateLightbox() {
  const img = GALLERY_IMAGES[window._galleryIndex]
  const lbImg = document.getElementById('lb-img')
  const lbCaption = document.getElementById('lb-caption')
  const lbCounter = document.getElementById('lb-counter')
  if (lbImg) lbImg.src = img.src
  if (lbCaption) lbCaption.textContent = img.caption
  if (lbCounter)
    lbCounter.textContent = `${window._galleryIndex + 1} / ${GALLERY_IMAGES.length}`
}

// ========== INITIALIZE ==========
// Initialisation is handled by the DOMContentLoaded in index.html.
