'use strict';

import Router from './modules/router.js';


export default class Application {
  constructor() {
  }

  run() {
    Router.changeSection('Menu');
  }

}

//renderDOM(menuSection.render(), document.getElementById('root'));