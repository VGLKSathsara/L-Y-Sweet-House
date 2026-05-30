export default function Footer({ onHistoryOpen }) {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="LY Sweet & Fancy House" className="w-12 h-12 rounded-xl object-contain opacity-90" />
            <div>
              <div className="font-display font-bold text-white text-sm">LY Sweet &amp; Fancy House</div>
              <div className="text-xs text-gray-500">Kataragama New Town</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {[
              { label: 'Shop', href: '#shop' },
              { label: 'About', href: '#about' },
              { label: 'Gallery', href: '#gallery' },
              { label: 'Contact', href: '#contact' },
            ].map(l => (
              <a key={l.label} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
            ))}
            <button onClick={onHistoryOpen} className="hover:text-white transition-colors">Order History</button>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><i className="fa-solid fa-phone" /> 0767 726 820</span>
            <span className="flex items-center gap-1.5"><i className="fa-brands fa-whatsapp text-green-500" /> 0767 726 820</span>
          </div>
          <div className="text-gray-600">© 2025–2026 LY Sweet &amp; Fancy House. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
