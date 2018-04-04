'use strict';

import Router from './modules/router.js';
import {selector} from './config/selector.js';


export default class Application {
  constructor() {
    this.root = document.getElementById(selector.ROOT);
  }

  run() {
    Router.changeSection('Menu');
  }

}

//renderDOM(menuSection.render(), document.getElementById('root'));