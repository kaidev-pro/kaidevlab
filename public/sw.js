// Kaidevlab — Service Worker (Offline PWA & Ultra-fast Offline Caching)
const CACHE_NAME = "kaidevlab-pwa-v18";
const IMAGE_CACHE = "kaidevlab-pwa-img-v1";
const MAX_IMAGE_ENTRIES = 60;

const PRECACHE_URLS = [
  "/",
  "/learn/",
  "/tools/n3-suite/",
  "/tools/fe-study/",
  "/tools/tango-n3/",
  "/tools/dokkai-n3/",
  "/tools/bunpou-n3/",
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
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up old caches immediately (keep current + image cache)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME && key !== IMAGE_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Batasi jumlah entri cache gambar (media bisa sangat banyak)
async function trimImageCache() {
  const cache = await caches.open(IMAGE_CACHE);
  const keys = await cache.keys();
  if (keys.length > MAX_IMAGE_ENTRIES) {
    await Promise.all(keys.slice(0, keys.length - MAX_IMAGE_ENTRIES).map((key) => cache.delete(key)));
  }
}

// Fetch Event: Cache-First static immutable, SWR gambar, Network-first HTML
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests or browser extension requests
  if (event.request.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  // 1. Next.js immutable static assets (_next/static/css, _next/static/chunks)
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

  // 2. Brand images, media, and icons -> Stale-While-Revalidate + batas entri
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
      caches.open(IMAGE_CACHE).then((cache) =>
        cache.match(event.request).then((cachedResponse) => {
          const networkFetch = fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(event.request, networkResponse.clone()).then(trimImageCache);
              }
              return networkResponse;
            })
            .catch(() => cachedResponse);
          return cachedResponse || networkFetch;
        })
      )
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
              // Jangan cache navigasi ber-query sensitif (mis. ?sync=)
              const cacheable =
                networkResponse &&
                networkResponse.status === 200 &&
                !url.search.includes("sync=");
              if (cacheable) {
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
                  resolve(caches.match("/tools/tango-n3/").then((fb) => fb || caches.match("/learn/")));
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
