// Service Worker for Meet AJ Portfolio PWA
const CACHE_NAME = 'meet-aj-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/css/rtl.css',
  '/assets/js/main.js',
  '/assets/js/i18n.js',
  '/assets/img/favicon.png',
  '/assets/img/apple-touch-icon.png',
  '/assets/img/logo.png',
  '/assets/img/hero-bg.jpg',
  '/assets/img/my-profile-img.jpg',
  '/assets/img/my-profile-img-2.jpg',
  '/assets/vendor/bootstrap/css/bootstrap.min.css',
  '/assets/vendor/bootstrap-icons/bootstrap-icons.css',
  '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/assets/vendor/aos/aos.css',
  '/assets/vendor/aos/aos.js'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('PWA Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.log('PWA Cache failed:', error);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(function() {
        // Return offline page if both cache and network fail
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('PWA Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
