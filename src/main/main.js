'use strict';

import Application from './application.js';

const app = new Application();

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    app.run();
  }
};
