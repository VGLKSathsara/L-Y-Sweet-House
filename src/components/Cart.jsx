import { CONFIG } from '../data/config'

export default function Cart({ open, onClose, cartItems, cartTotal, onAdd, onRemove, onSet, onClear, onCheckout }) {
  const items = cartItems()
  const total = cartTotal()

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[1001] flex flex-col shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-display font-bold text-lg text-gray-900">🛒 Your Cart</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 text-xl transition-colors">×</button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-3">🛒</div>
              <p className="text-sm">Your cart is empty. Add some products!</p>
            </div>
          ) : items.map(item => {
            const lineTotal = item.price * item.qty + (item.hasBandesiya ? CONFIG.bandesiyaDeposit * item.qty : 0)
            return (
              <div key={item.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.emoji || '🪷'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900 leading-tight">{item.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">Rs. {item.price.toLocaleString()} each</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => onRemove(item.id)} className="w-7 h-7 bg-brand-100 text-brand-700 rounded-lg font-bold text-sm hover:bg-brand-200 transition-colors flex items-center justify-center">−</button>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={e => onSet(item.id, e.target.value)}
                      className="w-10 text-center border border-gray-200 rounded-lg text-xs py-1 font-semibold"
                    />
                    <button onClick={() => onAdd(item.id)} className="w-7 h-7 bg-brand-100 text-brand-700 rounded-lg font-bold text-sm hover:bg-brand-200 transition-colors flex items-center justify-center">+</button>
                  </div>
                </div>
                {item.hasBandesiya && (
                  <div className="mt-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-1.5">
                    🏺 Bandesiya deposit: Rs. {(CONFIG.bandesiyaDeposit * item.qty).toLocaleString()} (refundable)
                  </div>
                )}
                <div className="mt-2 text-right text-xs font-bold text-brand-600">
                  Subtotal: Rs. {lineTotal.toLocaleString()}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Total Amount</span>
            <span className="text-xl font-bold text-brand-600">Rs. {total.toLocaleString()}</span>
          </div>
          <button
            onClick={() => { onClose(); onCheckout() }}
            disabled={items.length === 0}
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-colors"
          >
            <i className="fa-brands fa-whatsapp text-lg" /> Proceed to Order
          </button>
          <button
            onClick={() => { if (confirm('Clear entire cart?')) onClear() }}
            className="w-full text-xs text-gray-400 hover:text-red-500 border border-gray-100 py-2 rounded-xl hover:border-red-200 transition-colors"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </>
  )
}
