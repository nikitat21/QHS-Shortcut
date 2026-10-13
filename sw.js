'use strict';

const CACHE_PREFIX = 'qhs-shortcut-static-';
const CACHE_NAME = CACHE_PREFIX + 'v2';
const ROOT = new URL('./', self.location.href);
const ASSETS = ['./', './index.html', './styles.css', './app.js', './icon-192.png', './icon-512.png', './manifest.webmanifest']
  .map(path => new URL(path, ROOT).href);
const ALLOWED = new Set(ASSETS);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // Never remove another site's caches on the shared github.io origin.
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== ROOT.origin) return;
  url.search = '';
  url.hash = '';
  if (!ALLOWED.has(url.href)) return;
  // A versioned, coherent static bundle; the next worker version updates it
  // after the old page closes. No catalogue, credentials or native app data.
  event.respondWith(caches.open(CACHE_NAME).then(async cache =>
    await cache.match(url.href) || fetch(event.request)));
});
