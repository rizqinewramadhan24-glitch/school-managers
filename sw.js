// Simple Service Worker
const CACHE_NAME = 'school-app-v1';
const urlsToCache = [
  '/school-manager/',
  '/school-manager/index.html',
  '/school-manager/style.css',
  '/school-manager/script.js',
  '/school-manager/theme.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});