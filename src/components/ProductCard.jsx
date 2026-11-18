import { memo, useState, useRef, useEffect, useCallback } from 'react'
import { CONFIG } from '../data/config'
import { optimizeImg } from '../utils/helpers'

function ProductCard({ product, onAdd }) {
  const [added, setAdded] = useState(false)
  const [imgErr, setImgErr] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleAdd = useCallback(() => {
    onAdd(product.id)
    setAdded(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 700)
  }, [onAdd, product.id])

  return (
    // Outer shell animates only transform/opacity (compositor-only, 60fps).
    // The hover shadow lives on a pseudo-element whose opacity is animated,
    // so no box-shadow repaint happens per frame.
    <div className="group relative h-full rounded-2xl transition-transform duration-300 hover:-translate-y-1 after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:opacity-0 after:shadow-xl after:transition-opacity after:duration-300 hover:after:opacity-100">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden h-full">
        {/* Image or emoji */}
        {product.imageUrl && !imgErr ? (
          <div className="relative overflow-hidden h-44 bg-gray-100">
            <img
              src={optimizeImg(product.imageUrl, 600)}
              srcSet={`${optimizeImg(product.imageUrl, 400)} 400w, ${optimizeImg(product.imageUrl, 800)} 800w`}
              sizes="(min-width:1024px) 360px, (min-width:640px) 45vw, 92vw"
              alt={product.name}
              width="600"
              height="440"
              loading="lazy"
              decoding="async"
              onError={() => setImgErr(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-[transform,background-color] duration-200 active:scale-95 ${
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
    </div>
  )
}

export default memo(ProductCard)
