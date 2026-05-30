import { useState } from 'react'
import { GALLERY_IMAGES } from '../data/products'

function Lightbox({ index, onClose, onNav }) {
  if (index === null) return null
  const img = GALLERY_IMAGES[index]
  return (
    <div
      className="fixed inset-0 z-[1300] bg-black/92 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-3xl w-full flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-10 right-0 text-white/70 hover:text-white text-3xl leading-none">×</button>
        <button onClick={() => onNav(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white/70 hover:text-white text-4xl w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors">‹</button>
        <img src={img.src} alt={img.caption} className="max-h-[75vh] w-full object-contain rounded-2xl shadow-2xl" />
        <button onClick={() => onNav(1)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white/70 hover:text-white text-4xl w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors">›</button>
        <div className="flex justify-between w-full text-sm text-gray-300">
          <span className="font-display">{img.caption}</span>
          <span className="text-gray-500">{index + 1} / {GALLERY_IMAGES.length}</span>
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [lbIndex, setLbIndex] = useState(null)

  const nav = dir => setLbIndex(i => (i + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)

  return (
    <section id="gallery" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            Our Gallery
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-2">Pooja Watti Gallery</h2>
          <p className="text-gray-500 text-sm">A look at our handcrafted pooja offerings</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={i}
              onClick={() => setLbIndex(i)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 hover:border-brand-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-gray-100"
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={e => { e.currentTarget.closest('button').style.display = 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-300">{img.category}</span>
                <span className="text-sm font-bold text-white font-display">{img.caption}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox index={lbIndex} onClose={() => setLbIndex(null)} onNav={nav} />
    </section>
  )
}
