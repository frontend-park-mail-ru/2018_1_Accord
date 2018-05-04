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
  const path = event.request.url;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (navigator.onLine) {
          return fetch(event.request).then((serverResponse) => {
            if (!~path.indexOf('https://backend-accord-02-2018.herokuapp.com/')) {
              let serverResponseClone = serverResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, serverResponseClone);
              });
            }
            return serverResponse;
          });
        }
        else {
          return cachedResponse;
        }
      })
  );
});
