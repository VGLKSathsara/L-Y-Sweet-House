// Service Worker for LY Sweet & Fancy House
const CACHE_NAME = 'ly-shop-v1'
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/app.js',
  '/data.js',
  '/style.css',
  '/favicon.ico',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Cache addAll error:', err)
        return Promise.resolve()
      })
    })
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip cross-origin and WhatsApp requests
  if (url.origin !== location.origin || url.hostname === 'wa.me') {
    return
  }

  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response
      }

      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'error') {
          return response
        }

        const responseClone = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone)
        })

        return response
      })
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
