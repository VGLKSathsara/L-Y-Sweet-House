import { useState, useEffect } from 'react'
import { downloadSlip } from './ConfirmModal'
import { CONFIG } from '../data/config'
import { escapeHtml, buildWhatsAppMsg } from '../utils/helpers'

const DB_KEY = 'ly_orders'

function getAllOrders() {
  try {
    const s = localStorage.getItem(DB_KEY)
    if (!s || s === 'null') return []
    const p = JSON.parse(s)
    return Array.isArray(p) ? p : []
  } catch { return [] }
}

function saveOrders(orders) {
  localStorage.setItem(DB_KEY, JSON.stringify(orders))
}

const STATUS_STYLES = {
  pending:   'bg-yellow-50 text-yellow-700 border-yellow-200',
  confirmed: 'bg-green-50 text-green-700 border-green-200',
  delivered: 'bg-purple-50 text-purple-700 border-purple-200',
}

export function saveOrder(order) {
  const orders = getAllOrders()
  orders.unshift(order)
  saveOrders(orders)
}

export default function HistoryModal({ open, onClose }) {
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (open) setOrders(getAllOrders())
  }, [open])

  if (!open) return null

  const updateStatus = (id, status) => {
    const next = getAllOrders()
    const idx = next.findIndex(o => o.id === id)
    if (idx !== -1) { next[idx].status = status; saveOrders(next); setOrders([...next]) }
  }

  const resend = order => {
    const msg = buildWhatsAppMsg(order.id, order.customerName, order.userId || '—', order.phone1 || '—', order.phone2 || '—', order.address, order.items, order.total, order.note, CONFIG.bandesiyaDeposit)
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const filtered = orders.filter(o => {
    const q = search.toLowerCase().trim()
    if (!q) return true
    return o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || (o.userId||'').toLowerCase().includes(q) || (o.phone1||'').includes(q) || (o.phone2||'').includes(q)
  })

  return (
    <div className="fixed inset-0 z-[1100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90dvh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <h3 className="font-display font-bold text-lg text-gray-900">📋 Order History</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 text-xl transition-colors">×</button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-gray-50">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by order ID, name, or user ID..."
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-2">📭</div>
              <p className="text-sm">{search ? 'No matching orders found.' : 'No orders yet. Place your first order!'}</p>
            </div>
          ) : filtered.map(order => (
            <div key={order.id} className="border border-gray-100 rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="font-bold text-brand-600 text-sm">🔖 {order.id}</div>
                  <div className="text-xs text-gray-400 mt-0.5">📅 {order.date}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    👤 {escapeHtml(order.customerName)}{order.userId ? ` · 🆔 ${escapeHtml(order.userId)}` : ''}<br />
                    📱 {escapeHtml(order.phone1||'—')} / {escapeHtml(order.phone2||'—')}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[order.status||'pending']}`}>
                    {(order.status||'PENDING').toUpperCase()}
                  </span>
                  <div className="font-bold text-brand-600 text-sm mt-1">Rs. {order.total.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {order.items.map((item, i) => (
                  <span key={i} className="bg-brand-50 text-brand-600 text-[10px] font-medium px-2.5 py-1 rounded-full">
                    {item.emoji || '🪷'} {item.name} ×{item.qty}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button onClick={() => downloadSlip(order)} className="bg-brand-600 hover:bg-brand-700 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors">
                  📥 Slip
                </button>
                <button onClick={() => resend(order)} className="bg-green-500 hover:bg-green-600 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors">
                  📲 Resend
                </button>
                <select
                  value={order.status||'pending'}
                  onChange={e => updateStatus(order.id, e.target.value)}
                  className="border border-gray-200 text-[11px] rounded-lg px-2 py-1.5 bg-white text-gray-600 cursor-pointer"
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="confirmed">✅ Confirmed</option>
                  <option value="delivered">🚚 Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
