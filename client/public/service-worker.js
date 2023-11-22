const CACHE_NAME = "my-react-app-cache";

const urlsToCache = [
  "/",
  "/index.html",

  // API URLs
  "http://192.168.178.248:3001/plane/find",
  "http://192.168.178.248:3001/plane/number",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
