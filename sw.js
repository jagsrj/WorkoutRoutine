// JAMS Fitness service worker: lets the app open without internet.
// Pages load fresh from the network when online (so updates show right away)
// and fall back to the saved copy when offline. /api/ calls are never cached.
const CACHE = 'jams-v6';
// Cloudflare serves the app at ./ (index.html redirects there), so the page is cached under ./
const SHELL = ['./', 'icon.svg', 'manifest.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); if (res.ok && !res.redirected) caches.open(CACHE).then(c => c.put('./', copy)); return res; })
      .catch(() => caches.match('./')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; }).catch(() => hit);
    return hit || net;
  }));
});
