// Kaidevlab — Service Worker (Offline PWA & Ultra-fast Offline Caching)
const CACHE_NAME = "kaidevlab-pwa-v17";

const PRECACHE_URLS = [
  "/learn",
  "/tools/n3-suite",
  "/tools/fe-study",
  "/tools/tango-n3",
  "/tools/dokkai-n3",
  "/favicon.ico",
  "/brand/kaidevlab-icon-192.png",
  "/brand/kaidevlab-icon-512.png",
  "/apple-touch-icon.png",
];

// Install Event: Pre-cache critical routes
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up old caches immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Event: Cache-First for immutable static assets, Network-first with fast timeout for HTML
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests or browser extension requests
  if (event.request.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  // 1. Next.js immutable static assets (_next/static/css, _next/static/chunks)
  // These files are hashed and never change. Cache-First ensures instant (<10ms) loading on slow networks.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 2. Brand images, media, and icons -> Cache-first with network fallback
  if (
    url.pathname.startsWith("/brand/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/media/") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".ico")
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 3. HTML page navigations -> Network-first with 2s timeout fallback to cache
  if (event.request.mode === "navigate") {
    event.respondWith(
      new Promise((resolve) => {
        let didResolve = false;

        // Set a 2-second timeout for slow / hanging mobile connections
        const timer = setTimeout(() => {
          if (!didResolve) {
            caches.match(event.request).then((cached) => {
              if (cached) {
                didResolve = true;
                resolve(cached);
              }
            });
          }
        }, 2000);

        fetch(event.request)
          .then((networkResponse) => {
            clearTimeout(timer);
            if (!didResolve) {
              didResolve = true;
              if (networkResponse && networkResponse.status === 200) {
                const responseClone = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, responseClone);
                });
              }
              resolve(networkResponse);
            }
          })
          .catch(() => {
            clearTimeout(timer);
            if (!didResolve) {
              didResolve = true;
              caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                  resolve(cachedResponse);
                } else {
                  // Fallback to offline precached entry point if matching route not found
                  resolve(caches.match("/tools/tango-n3").then((fb) => fb || caches.match("/learn")));
                }
              });
            }
          });
      })
    );
    return;
  }

  // Other standard requests
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).then((networkResponse) => {
          return networkResponse;
        })
      );
    })
  );
});
