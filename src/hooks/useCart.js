import { useState, useCallback } from 'react'
import { ALL_PRODUCTS } from '../data/products'
import { CONFIG } from '../data/config'

function loadCartFromStorage() {
  try {
    const expiry = localStorage.getItem('ly_cart_expiry')
    if (expiry && Date.now() > parseInt(expiry)) { localStorage.removeItem('ly_cart'); return {} }
    const s = localStorage.getItem('ly_cart')
    return s ? JSON.parse(s) : {}
  } catch { return {} }
}

function saveCartToStorage(cart) {
  try {
    localStorage.setItem('ly_cart', JSON.stringify(cart))
    localStorage.setItem('ly_cart_expiry', Date.now() + 30 * 24 * 60 * 60 * 1000)
  } catch (e) {
    if (e.name === 'QuotaExceededError') { localStorage.removeItem('ly_orders'); localStorage.setItem('ly_cart', JSON.stringify(cart)) }
  }
}

export function useCart() {
  const [cart, setCart] = useState(loadCartFromStorage)

  const update = useCallback(updater => {
    setCart(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveCartToStorage(next)
      return next
    })
  }, [])

  const cartAdd = useCallback(id => {
    update(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }, [update])

  const cartRemove = useCallback(id => {
    update(prev => {
      const next = { ...prev }
      if (!next[id]) return prev
      next[id]--
      if (next[id] <= 0) delete next[id]
      return next
    })
  }, [update])

  const cartSet = useCallback((id, qty) => {
    qty = parseInt(qty)
    if (isNaN(qty) || qty <= 0) {
      update(prev => { const n = { ...prev }; delete n[id]; return n })
    } else if (qty <= 999) {
      update(prev => ({ ...prev, [id]: qty }))
    }
  }, [update])

  const cartClear = useCallback(() => update({}), [update])

  const cartItems = useCallback(() =>
    Object.entries(cart).map(([id, qty]) => {
      const p = ALL_PRODUCTS.find(x => x.id === id)
      return p ? { ...p, qty } : null
    }).filter(Boolean)
  , [cart])

  const cartTotal = useCallback(() => {
    return cartItems().reduce((sum, item) => {
      return sum + item.price * item.qty + (item.hasBandesiya ? CONFIG.bandesiyaDeposit * item.qty : 0)
    }, 0)
  }, [cartItems])

  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0)

  return { cart, cartAdd, cartRemove, cartSet, cartClear, cartItems, cartTotal, cartCount }
}
