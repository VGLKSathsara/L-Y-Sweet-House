import { useState } from 'react'
import { CONFIG } from '../data/config'

export default function ProductCard({ product, onAdd }) {
  const [added, setAdded] = useState(false)
  const [imgErr, setImgErr] = useState(false)

  const handleAdd = () => {
    onAdd(product.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 700)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image or emoji */}
      {product.imageUrl && !imgErr ? (
        <div className="relative overflow-hidden h-44">
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.hasBandesiya && (
            <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
              🏺 Bandesiya
            </span>
          )}
        </div>
      ) : (
        <div className="h-28 flex items-center justify-center bg-brand-50 text-5xl">
          {product.emoji || '🪷'}
        </div>
      )}

      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-display font-bold text-gray-900 text-[0.95rem] leading-snug">{product.name}</h3>

        {product.description && (
          <p className="text-xs text-gray-500 leading-relaxed">{product.description}</p>
        )}

        {product.details && product.details.length > 0 && (
          <ul className="space-y-0.5">
            {product.details.map((d, i) => (
              <li key={i} className="text-[11px] text-brand-600 flex items-center gap-1.5">
                <span className="text-brand-400">✦</span> {d}
              </li>
            ))}
          </ul>
        )}

        {product.hasBandesiya && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-[11px] text-amber-800 leading-relaxed">
            🏺 Bandesiya denna. Rs. {CONFIG.bandesiyaDeposit} deposit included. Return karoth refund labenawa.
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between border-t border-dashed border-gray-100">
          <span className="font-bold text-brand-600 text-lg">Rs. {product.price.toLocaleString()}</span>
          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              added
                ? 'bg-green-500 text-white scale-105'
                : 'bg-brand-600 hover:bg-brand-700 text-white'
            }`}
          >
            {added ? '✓ Added' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
