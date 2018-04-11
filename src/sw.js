import Logger from 'main/utils/logger.js';

const CACHE_NAME = 'donuts-wars_sw';
const cacheUrls = [
  '/swResponse.png'
];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(cacheUrls);
      })
      .catch((err) => {
        Logger.error('smth went wrong with caches.open: ', err);
      })
  );
});


this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return fetch(event.request).then((serverResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, serverResponse.clone());
            return serverResponse;
          });
        }) || cachedResponse;
      })
      .catch((err) => {
        Logger.error(err);
        return caches.match('/swResponse.png');
      })
  );
});
