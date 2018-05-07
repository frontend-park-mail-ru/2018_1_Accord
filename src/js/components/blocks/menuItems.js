import {selector} from '../../config/selector.js';
import LinkedButton from './buttons/linkedButton.js';
import LogoutButton from './buttons/logoutButton.js';
import {pagePaths} from '../../config/pagePaths.js';


export default class MenuItems {

  /**
   *
   * @param {HTMLElement} element
   * @param {Array<String>} selectors
   */
  constructor(element, selectors) {
    this.menu = element.querySelector(selector.MENU_ITEMS);
    this.selectors = selectors;

    this.selectors.forEach((value) => {
      switch (value) {
        case selector.PLAY_BUTTON:
          new LinkedButton(this.menu, selector.PLAY_BUTTON, 'Play', undefined, pagePaths.GAME_PATH);
          break;

        case selector.HELP_BUTTON:
          new LinkedButton(this.menu, selector.HELP_BUTTON, 'Help', undefined, pagePaths.HELP_PATH);
          break;

        case selector.LOGIN_BUTTON:
          new LinkedButton(this.menu, selector.LOGIN_BUTTON, 'Login', undefined, pagePaths.LOGIN_PATH);
          break;

        case selector.SIGN_UP_BUTTON:
          new LinkedButton(this.menu, selector.SIGN_UP_BUTTON, 'Signup', undefined, pagePaths.SIGN_UP_PATH);
          break;

        case selector.LOGOUT_BUTTON:
          new LogoutButton(this.menu, selector.LOGOUT_BUTTON);
          break;

        case selector.LEADER_BOARD_BUTTON:
          new LinkedButton(this.menu, selector.LEADER_BOARD_BUTTON, 'LeaderBoard', undefined, pagePaths.LEADER_BOARD_PATH);
          break;
      }
    });
  }
}