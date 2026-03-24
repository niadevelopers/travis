
const CACHE_NAME = 'Travis_guardian-v1_0';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/travis_core.html',
  '/input-app.css',
  '/input-landing.css',
  '/script.js',
  '/tailwind-app.css',
  '/tailwind-landing.css',
  '/manifest.json',
  '/npm/charts'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;

  if (req.url.includes('/activate-fingerprint')) {
    event.respondWith(fetch(req));
    return;
  }

  if (req.destination === 'script' || req.destination === 'document') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;

      return fetch(req).then(res => {
        if (!res || res.status !== 200) return res;

        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        return res;
      });
    })
  );
});
