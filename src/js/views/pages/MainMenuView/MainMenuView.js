import userService from '../../../services/UserService.js';
import Logger from '../../../utils/logger.js';
import {fetchFaildErrors} from '../../../config/textErrors.js';
import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import NavBar from '../../../components/blocks/navBar/navBar.js';
import MenuItems from '../../../components/blocks/menuItems.js';


export default class MenuView extends BaseView {
  constructor() {
    super('js/views/pages/MainMenuView/MainMenuView.tmpl');

    this.navBar = [
      selector.MUTE_BUTTON,
      selector.SETTINGS_BUTTON
    ];
    this.menuItems = [
      selector.PLAY_BUTTON,
      selector.HELP_BUTTON,
      selector.LEADER_BOARD_BUTTON
    ];
  }

  async render() {
    super.render();

    this.menu = this.el.querySelector(selector.MAIN_MENU_VIEW);
    this.errorField = this.menu.querySelector(selector.MAIN_ERROR);
    this.errorField.style.display = 'none';

    try {
      this.user = await userService.getUser();

      if (!this.user) {
        this.navBar = [
          selector.MUTE_BUTTON,
          selector.SETTINGS_BUTTON
        ];

        this.menuItems = [
          selector.PLAY_BUTTON,
          selector.HELP_BUTTON,
          selector.LEADER_BOARD_BUTTON,
          selector.LOGIN_BUTTON,
          selector.SIGN_UP_BUTTON
        ];

      } else {
        this.navBar = [
          selector.MUTE_BUTTON,
          selector.SETTINGS_BUTTON,
          selector.PROFILE_BUTTON
        ];
        this.menuItems = [
          selector.PLAY_BUTTON,
          selector.HELP_BUTTON,
          selector.LEADER_BOARD_BUTTON,
          selector.LOGOUT_BUTTON
        ];
      }

    } catch (error) {
      Logger.error(error);
      this.errorField.innerText = fetchFaildErrors.noConnection;
      this.errorField.style.display = 'block';
    }

    new NavBar(this.menu, this.navBar, this.user);
    new MenuItems(this.menu, this.menuItems);

    return this.el;
  }

}
