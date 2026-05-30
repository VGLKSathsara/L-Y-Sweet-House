import { useState, useEffect, useCallback } from 'react'
import PageLoader from './components/PageLoader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Shop from './components/Shop'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cart from './components/Cart'
import WelcomeModal from './components/WelcomeModal'
import OrderModal from './components/OrderModal'
import ConfirmModal from './components/ConfirmModal'
import HistoryModal, { saveOrder } from './components/HistoryModal'
import { useCart } from './hooks/useCart'
import { CONFIG } from './data/config'
import { generateOrderId, buildWhatsAppMsg } from './utils/helpers'

function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-[998] w-11 h-11 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-300 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
      aria-label="Back to top"
    >
      <i className="fa-solid fa-chevron-up text-sm" />
    </button>
  ) : null
}

function Toast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9000] bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full shadow-xl animate-fade-in-up pointer-events-none">
      {message}
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [welcomeOpen, setWelcomeOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [confirmOrder, setConfirmOrder] = useState(null)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [toast, setToast] = useState('')

  const { cartAdd, cartRemove, cartSet, cartClear, cartItems, cartTotal, cartCount } = useCart()

  const showToast = useCallback(msg => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }, [])

  // Loader + welcome timing
  useEffect(() => {
    const start = Date.now()
    const welcomed = sessionStorage.getItem('ly_welcomed')

    function dismiss() {
      const elapsed = Date.now() - start
      const delay = Math.max(0, 500 - elapsed)
      setTimeout(() => {
        setLoading(false)
        if (!welcomed) {
          setTimeout(() => setWelcomeOpen(true), 400)
        }
      }, delay)
    }

    if (document.readyState === 'complete') {
      dismiss()
    } else {
      window.addEventListener('load', dismiss, { once: true })
      const fallback = setTimeout(dismiss, 2000)
      return () => clearTimeout(fallback)
    }
  }, [])

  // Close welcome + mark session
  const handleCloseWelcome = () => {
    setWelcomeOpen(false)
    sessionStorage.setItem('ly_welcomed', '1')
  }

  // Checkout
  const handleOrderSubmit = form => {
    const items = cartItems()
    if (!items.length) return
    const orderId = generateOrderId()
    const total = cartTotal()
    const dateStr = new Date().toLocaleString('en-LK', { timeZone: 'Asia/Colombo' })

    const order = {
      id: orderId,
      date: dateStr,
      customerName: form.name,
      userId: form.userId,
      phone1: form.phone1,
      phone2: form.phone2,
      address: form.address || '',
      note: form.note || '',
      items,
      total,
      hasBandesiyaItems: items.some(i => i.hasBandesiya),
      status: 'pending',
    }

    saveOrder(order)

    const msg = buildWhatsAppMsg(orderId, form.name, form.userId, form.phone1, form.phone2, form.address, items, total, form.note, CONFIG.bandesiyaDeposit)
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')

    setOrderOpen(false)
    setConfirmOrder(order)
    cartClear()
  }

  // Escape key handler
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') {
        setWelcomeOpen(false)
        setCartOpen(false)
        setOrderOpen(false)
        setConfirmOrder(null)
        setHistoryOpen(false)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // SW registration
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  return (
    <>
      {loading && <PageLoader />}

      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onHistoryOpen={() => setHistoryOpen(true)}
      />

      <main>
        <Hero />
        <Shop onAdd={id => { cartAdd(id); showToast('Added to cart!') }} />
        <Gallery />
        <About />
        <Contact />
      </main>

      <Footer onHistoryOpen={() => setHistoryOpen(true)} />

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        onAdd={cartAdd}
        onRemove={cartRemove}
        onSet={cartSet}
        onClear={cartClear}
        onCheckout={() => setOrderOpen(true)}
      />

      <WelcomeModal open={welcomeOpen} onClose={handleCloseWelcome} />

      <OrderModal
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        onSubmit={handleOrderSubmit}
      />

      <ConfirmModal
        open={!!confirmOrder}
        order={confirmOrder}
        onClose={() => setConfirmOrder(null)}
      />

      <HistoryModal open={historyOpen} onClose={() => setHistoryOpen(false)} />

      <BackToTop />
      <Toast message={toast} />
    </>
  )
}
