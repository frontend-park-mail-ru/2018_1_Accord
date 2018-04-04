'use strict';

import Router from './modules/router.js';
import {selectorMap} from './config/selectorMap.js';


export default class Application {
  constructor() {
    this.root = document.getElementById(selectorMap.ROOT);
  }

  run() {
    Router.changeSection('Menu');
  }

}

//renderDOM(menuSection.render(), document.getElementById('root'));