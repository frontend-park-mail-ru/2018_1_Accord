'use strict';

import Router from './modules/router.js';
import {selector} from './config/selector.js';
import MenuView from './views/pages/MainMenuView/mainMenuView.js';
import LoginView from './views/pages/LoginView/loginView.js';
import HelpView from './views/pages/HelpView/helpView.js';
import LeaderBoardView from './views/pages/LeaderBoard/leaderBoardView.js';
import SignUpView from './views/pages/SignUpView/signUpView.js';
import GameView from './views/pages/GameView/gameView.js';
//import ProfileView from './views/pages/ProfileView/profileView.js';



export default class Application {
  constructor() {
    this.root = document.getElementById(selector.ROOT);
  }

  run() {
    new Router(this.root)
      .add('/', MenuView)
      .add('/login/', LoginView)
      .add('/help/', HelpView)
      .add('/leaderboard/', LeaderBoardView)
      .add('/signup/', SignUpView)
      .add('/game/', GameView)
      //.add('/profile/', ProfileView)
      .start();
  }
}