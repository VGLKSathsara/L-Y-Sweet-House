// Service Worker for LY Sweet & Fancy House
// Strategy:
//   - Page navigations (index.html): network-first, so a new deploy is never hidden behind a stale cached shell.
//   - Hashed build files (/assets/*) and static images: cache-first (they never change under the same URL).
const CACHE_NAME = 'ly-shop-v3'
const ASSETS_TO_CACHE = [
  '/favicon.ico',
  '/logo-sm.png',
  '/logo-2.png',
  '/manifest.json',
]

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(ASSETS_TO_CACHE).catch((err) => console.warn('Cache addAll error:', err))
    )
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((names) =>
        Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
      ),
    ])
  )
})

function putInCache(request, response) {
  if (!response || response.status !== 200 || response.type === 'error') return
  const copy = response.clone()
  caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  // Ignore cross-origin (fonts, CDN images, WhatsApp) — the browser's HTTP cache handles those
  if (url.origin !== self.location.origin) return

  // Navigations: network first, fall back to the cached shell when offline
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          putInCache('/', response.clone())
          return response
        })
        .catch(() => caches.match('/').then((r) => r || Response.error()))
    )
    return
  }

  // Everything else: cache first, then network (and remember it)
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request).then((response) => {
        putInCache(request, response)
        return response
      })
    })
  )
})
