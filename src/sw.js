const CACHE_NAME = 'donuts-wars_sw';
const cacheUrls = [
  '/sw.js',
  '/',
  '/login/',
  '/signup/',
  '/help/',
  '/game/',
  //'/profile/',
  //'/settings/',
  'leaderboard'
];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(cacheUrls);
      })
      .catch((err) => {
        console.error('smth went wrong with caches.open: ', err);
      })
  );
});


this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (navigator.onLine) {
          return fetch(event.request).then((serverResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, serverResponse.clone());
              return serverResponse;
            });
          });
        } else {
          return cachedResponse;
        }
      })
      .catch((err) => {
        console.error(err);
      })
  );
});
