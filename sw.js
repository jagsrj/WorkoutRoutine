// KinFit service worker (bump CACHE when adding or renaming files): lets the app open without internet.
// Everything loads fresh from the network when online (so updates show right away)
// and falls back to the saved copy when offline. /api/ calls are never cached.
const CACHE = 'jams-v14';
// Cloudflare serves the app at ./ (index.html redirects there), so the page is cached under ./
const JS = ['errors', 'data', 'store', 'screens', 'sync', 'coach', 'photos', 'features', 'extras', 'smart', 'me'].map(n => `js/${n}.js`);
const SHELL = ['./', ...JS, 'icon.svg', 'manifest.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;
  const key = req.mode === 'navigate' ? './' : req;
  e.respondWith(fetch(req).then(res => {
    if (res.ok && !res.redirected) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(key, copy)); }
    return res;
  }).catch(() => caches.match(key).then(hit => hit || caches.match('./'))));
});
