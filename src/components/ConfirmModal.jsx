import { CONFIG } from '../data/config'
import { escapeHtml } from '../utils/helpers'

function downloadSlip(order) {
  const itemRows = order.items.map(item => {
    const sub = item.price * item.qty
    const bandesiyaRow = item.hasBandesiya
      ? `<tr><td colspan="4" style="font-size:11px;color:#7c3aed;padding:2px 10px 6px">🏺 Bandesiya deposit Rs. ${CONFIG.bandesiyaDeposit * item.qty} included (refundable)</td></tr>`
      : ''
    return `<tr><td>${escapeHtml(item.name)}</td><td style="text-align:center">${item.qty}</td><td style="text-align:right">Rs. ${item.price.toLocaleString()}</td><td style="text-align:right">Rs. ${sub.toLocaleString()}</td></tr>${bandesiyaRow}`
  }).join('')

  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Order Slip — ${order.id}</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',sans-serif;background:#fff;color:#222}
.slip{max-width:550px;margin:30px auto;padding:32px;border:2px solid #c084fc;border-radius:20px}
.slip-header{text-align:center;margin-bottom:20px}.slip-header h1{font-size:22px;color:#7c3aed;font-weight:700}
.slip-header p{font-size:12px;color:#666;margin-top:4px}
.slip-meta{background:#f5f3ff;border-radius:12px;padding:12px 16px;margin-bottom:20px;font-size:13px}
.slip-meta div{display:flex;justify-content:space-between;padding:3px 0}
table{width:100%;border-collapse:collapse;font-size:13px;margin-bottom:16px}
th{background:#7c3aed;color:#fff;padding:8px 10px;text-align:left}
td{padding:8px 10px;border-bottom:1px solid #ede9fe}
.slip-total{display:flex;justify-content:flex-end;gap:20px;font-size:15px;font-weight:700;color:#7c3aed;background:#f5f3ff;padding:12px 16px;border-radius:12px}
.slip-footer{text-align:center;font-size:11px;color:#999;margin-top:20px;border-top:1px dashed #ddd;padding-top:14px}
@media print{.no-print{display:none}}</style></head><body>
<div class="slip">
  <div class="slip-header"><h1>🪷 LY Sweet &amp; Fancy House</h1><p>${CONFIG.address}</p><p>Tel: ${CONFIG.phone}</p></div>
  <div class="slip-meta">
    <div><span>Order ID</span><strong>${order.id}</strong></div>
    <div><span>Date</span><strong>${order.date}</strong></div>
    <div><span>Customer</span><strong>${escapeHtml(order.customerName)}</strong></div>
    <div><span>User ID</span><strong>${escapeHtml(order.userId||'—')}</strong></div>
    <div><span>Phone 1</span><strong>${escapeHtml(order.phone1||'—')}</strong></div>
    <div><span>Phone 2</span><strong>${escapeHtml(order.phone2||'—')}</strong></div>
    ${order.address ? `<div><span>Address</span><strong>${escapeHtml(order.address)}</strong></div>` : ''}
  </div>
  <table><thead><tr><th>Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Unit</th><th style="text-align:right">Subtotal</th></tr></thead>
  <tbody>${itemRows}</tbody></table>
  <div class="slip-total"><span>TOTAL</span><span>Rs. ${order.total.toLocaleString()}</span></div>
  ${order.note ? `<div style="margin-top:12px;font-size:13px;color:#555"><strong>Note:</strong> ${escapeHtml(order.note)}</div>` : ''}
  <div class="slip-footer"><p>LY Sweet &amp; Fancy House — Thank you! 🙏</p><p>WhatsApp: ${CONFIG.phone}</p></div>
</div>
<div class="no-print" style="text-align:center;margin:20px">
  <button onclick="window.print()" style="background:#7c3aed;color:#fff;border:none;padding:12px 32px;border-radius:99px;font-size:15px;cursor:pointer;font-weight:600">🖨️ Print / Save PDF</button>
  <button onclick="window.close()" style="background:#f3f4f6;color:#333;border:none;padding:12px 32px;border-radius:99px;font-size:15px;cursor:pointer;margin-left:12px">Close</button>
</div></body></html>`

  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
  setTimeout(() => URL.revokeObjectURL(url), 60000)
}

export default function ConfirmModal({ open, order, onClose }) {
  if (!open || !order) return null
  return (
    <div className="fixed inset-0 z-[1100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl animate-pop-in text-center p-8" onClick={e => e.stopPropagation()}>
        <div className="text-5xl mb-3">✅</div>
        <h3 className="font-display font-bold text-xl text-gray-900 mb-1">Order Sent!</h3>
        <p className="text-brand-600 font-bold text-sm mb-3">Order ID: {order.id}</p>
        <p className="text-xs text-gray-400 leading-relaxed mb-6">
          WhatsApp message has been sent. We will confirm your order shortly.{' '}
          <strong className="text-gray-600">Keep this slip for bandesiya return reference.</strong>
        </p>
        <div className="space-y-2.5">
          <button
            onClick={() => downloadSlip(order)}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
          >
            📥 Download Order Slip
          </button>
          <button
            onClick={onClose}
            className="w-full border border-gray-200 text-gray-500 hover:bg-gray-50 font-medium py-3 rounded-xl transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export { downloadSlip }
