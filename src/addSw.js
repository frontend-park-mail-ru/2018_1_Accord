import Logger from 'main/utils/logger.js';

(function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {scope: '/'})
      .then((registration) => {
        console.log('sw registation on scope:', registration.scope);
      })
      .catch((err) => {
        Logger.error(err);
      });
  }
})();
