// sw.js — Offline-first PWA with precaching + cache cleanup

const CACHE_NAME = 'Travis_guardian-v1_0';   // ← bump this version (v2, v3…) when files change significantly
const STATIC_ASSETS = [
  '/',                        // root → usually serves index.html
  '/index.html',
  '/travis_core.html',
  '/input-app.css',
  '/input-landing.css',
  '/script.js',
  'tailwind.config.js',
  '/tailwind-app.css',
  '/tailwind-landing.css',   // your built Tailwind file
  // Add ALL critical files your app needs to render + function offline
  // ────────────────────────────────────────────────────────────────
  '/manifest.json',           // if you have one (strongly recommended for installability)
  
  // fonts (if any local), images, etc.
  // Do NOT add dynamic/API endpoints here — those usually stay network-first
];

// ────────────────────────────────────────────────
// Install → precache everything critical
// ────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(err => {
        console.error('[SW] Pre-caching failed:', err);
      })
  );

  // Activate new SW immediately (good for development & fast updates)
  self.skipWaiting();
});

// ────────────────────────────────────────────────
// Activate → clean up old caches
// ────────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
    .then(() => self.clients.claim())   // Take control of open pages immediately
  );
});

// ────────────────────────────────────────────────
// Fetch → Cache-first for precached assets, network fallback
//         (very rigid offline behavior for app shell)
// ────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  // Optional: ignore non-GET or non-http(s) requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return from cache if we have it (fast + offline)
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise go to network
        return fetch(event.request)
          .then(networkResponse => {
            // Optional: cache successful responses dynamically (for images, etc.)
            // But for rigid offline shell → usually skip this or be very selective
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone because response can only be consumed once
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));

            return networkResponse;
          })
          .catch(() => {
            // Network failed → you can return a fallback page/image here if desired
            // For now we just let it fail (rigid mode)
            // Example: return caches.match('/offline.html');
          });
      })
  );
});