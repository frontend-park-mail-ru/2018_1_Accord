'use strict';

import Router from './modules/router.js';
import {selectorMap} from './config/selectorMap.js';
import MenuView from './views/pages/MainMenuView/MainMenuView.js';
//import LoginSection from './views/pages/loginSection';


export default class Application {
  constructor() {
    this.root = document.getElementById(selectorMap.ROOT);
  }

  run() {
    new Router(this.root)
      .add('/', MenuView)
      //.add('/login', LoginSection)
      .start();
  }

}