import { useState } from 'react'
import ProductCard from './ProductCard'
import { POOJA_WATTI, SWEET_ITEMS, TOY_ITEMS } from '../data/products'

const TABS = [
  { id: 'pooja',  label: '🪷 Pooja Watti', products: POOJA_WATTI },
  { id: 'sweets', label: '🍬 Sweet Items',  products: SWEET_ITEMS },
  { id: 'toys',   label: '🧸 Toys',         products: TOY_ITEMS  },
]

export default function Shop({ onAdd }) {
  const [active, setActive] = useState('pooja')
  const current = TABS.find(t => t.id === active)

  return (
    <section id="shop" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            Our Products
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-2">
            Pooja Watti, Sweets &amp; Toys
          </h2>
          <p className="text-gray-500 text-sm">Select items, add to cart, and confirm via WhatsApp</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                active === tab.id
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in-up">
          {current?.products.map(product => (
            <ProductCard key={product.id} product={product} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  )
}
