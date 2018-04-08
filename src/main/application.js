'use strict';

import Router from './modules/router.js';
import {selector} from './config/selector.js';

import MenuView from './views/pages/MainMenuView/MainMenuView.js';
import LoginView from './views/pages/LoginView/LoginView.js';
import HelpView from './views/pages/HelpView/HelpView.js';
import LeaderBoardView from './views/pages/LeaderBoard/LeaderBoardView.js';
import SignUpView from './views/pages/SignUpView/SignUpView.js';
import GameView from './views/pages/GameView/GameView.js';
//import ProfileView from './views/pages/ProfileView/profileView.main';
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
