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
import {pagePaths} from './config/pagePaths.js';


export default class Application {
  constructor() {
    this.root = document.getElementById(selector.ROOT);
  }

  run() {
    new Router(this.root)
      .add(pagePaths.START_PATH, MenuView)
      .add(pagePaths.LOGIN_PATH, LoginView)
      .add(pagePaths.HELP_PATH, HelpView)
      .add(pagePaths.LEADER_BOARD_PATH, LeaderBoardView)
      .add(pagePaths.SIGN_UP_PATH, SignUpView)
      .add(pagePaths.GAME_PATH, GameView)
      //.add(pagePaths.PROFILE_PATH, ProfileView)
      .start();
  }
}