export default function WelcomeModal({ open, onClose }) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-[1200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl animate-pop-in relative max-h-[90dvh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Top gradient strip */}
        <div className="h-1 bg-gradient-to-r from-brand-600 via-purple-500 to-amber-400" />

        <div className="p-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 text-xl transition-colors"
          >
            ×
          </button>

          {/* Logo */}
          <div className="w-20 h-20 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-brand-100">
            <img src="/logo.png" alt="LY Sweet & Fancy House" className="w-14 h-14 object-contain rounded-xl" />
          </div>

          {/* Badge */}
          <span className="inline-block bg-amber-50 text-amber-600 text-[11px] font-semibold px-3 py-1 rounded-full mb-3">
            🪷 Kataragama New Town · Since 2015
          </span>

          <h2 className="font-display font-bold text-xl text-gray-900 mb-3">LY Sweet &amp; Fancy House</h2>

          {/* Tri-language greeting */}
          <div className="flex items-center justify-center gap-3 flex-wrap text-brand-600 font-bold text-base mb-4">
            <span lang="si">ආයුබෝවන්</span>
            <span className="text-gray-300 font-light">·</span>
            <span lang="en">Welcome</span>
            <span className="text-gray-300 font-light">·</span>
            <span lang="ta">வணக்கம்</span>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-5 max-w-xs mx-auto">
            Your trusted source for handcrafted <strong className="text-gray-700">Pooja Watti</strong>, traditional sweets &amp; gifts — serving devotees &amp; families in Kataragama.
          </p>

          {/* Meta info */}
          <div className="flex justify-center gap-4 text-xs text-gray-400 mb-6 flex-wrap">
            <span className="flex items-center gap-1.5"><i className="fa-solid fa-clock text-brand-400" /> Open daily 5 am – 11 pm</span>
            <span className="flex items-center gap-1.5"><i className="fa-solid fa-location-dot text-brand-400" /> New Town, Kataragama</span>
          </div>

          {/* Actions */}
          <div className="space-y-2.5">
            <button
              onClick={onClose}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              🛍️ Explore Products
            </button>
            <a
              href="https://wa.me/94767726820"
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              <i className="fa-brands fa-whatsapp" /> Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
