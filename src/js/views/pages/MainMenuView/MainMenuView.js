import userService from '../../../services/UserService.js';
import Logger from '../../../utils/logger.js';
//import {fetchFaildErrors} from '../../../config/textErrors.js';
import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import NavBar from '../../../components/blocks/navBar/navBar.js';
import MenuItems from '../../../components/blocks/menuItems.js';


export default class MenuView extends BaseView {
  constructor() {
    super('js/views/pages/MainMenuView/MainMenuView.tmpl');

    this.navBar = [selector.MUTE_BUTTON, selector.SETTINGS_BUTTON];
    this.menuItems = [selector.PLAY_BUTTON, selector.HELP_BUTTON];
  }

  render() {
    userService.getUser()
      .then((user) => {
        if (!user) {
          this.menuItems.push(selector.LOGIN_BUTTON, selector.SIGN_UP_BUTTON);
        } else {
          this.navBar.push(selector.PROFILE_BUTTON);
          this.menuItems.push(selector.LEADER_BOARD_BUTTON, selector.LOGOUT_BUTTON);
        }

        new NavBar(this.el, this.navBar, user);
        new MenuItems(this.el, this.menuItems);

        super.render();
        //TODO: обработать неуспешный выход
      })
      .catch((error) => {
        Logger.error(error);

        new NavBar(this.el, this.navBar, undefined);
        new MenuItems(this.el, this.menuItems);
        super.render();
        //this.textError.innerHTML = fetchFaildErrors.noConnection;
      });

    return this;
  }

}
