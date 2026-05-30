import { useState, useEffect } from 'react'

const links = [
  { label: 'Home', href: '#' },
  { label: 'Shop', href: '#shop' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ cartCount, onCartOpen, onHistoryOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-b border-gray-100 transition-shadow duration-300 ${scrolled ? 'shadow-md shadow-gray-100' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group"
          >
            <img src="/favicon.ico" alt="Logo" className="w-9 h-9 rounded-xl object-contain border border-brand-100 shadow-sm group-hover:shadow-brand-200 transition-shadow" />
            <div className="text-left hidden sm:block">
              <div className="font-display font-bold text-brand-700 text-[0.95rem] leading-tight">LY Sweet &amp; Fancy House</div>
              <div className="text-[0.65rem] text-gray-400 font-medium tracking-wide">Kataragama New Town</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={l.href === '#' ? e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) } : undefined}
                className="px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-brand-600 hover:bg-brand-50 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onHistoryOpen}
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 px-3 py-2 rounded-xl hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 transition-all"
            >
              <i className="fa-solid fa-clock-rotate-left text-xs" />
              <span className="hidden lg:inline">Orders</span>
            </button>
            <a
              href="https://wa.me/94767726820"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              <i className="fa-brands fa-whatsapp" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>
            <button
              onClick={onCartOpen}
              className="relative bg-brand-600 hover:bg-brand-700 text-white w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-colors"
              aria-label="Open cart"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden flex flex-col gap-1.5 w-9 h-9 items-center justify-center border border-gray-200 rounded-xl hover:bg-brand-50 transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-all origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-all ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2 shadow-lg">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={e => {
                  if (l.href === '#') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }
                  closeMenu()
                }}
                className="block py-2.5 px-2 text-sm font-medium text-gray-700 border-b border-gray-50 hover:text-brand-600 transition-colors last:border-0"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => { onHistoryOpen(); closeMenu() }}
                className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 py-2 rounded-xl"
              >
                <i className="fa-solid fa-clock-rotate-left text-xs" /> Orders
              </button>
              <a
                href="https://wa.me/94767726820"
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white text-sm font-semibold py-2 rounded-xl"
              >
                <i className="fa-brands fa-whatsapp" /> WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}
