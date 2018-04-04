import userService from '../../../services/UserService.js';
import Logger from '../../../utils/logger.js';
//import {fetchFaildErrors} from '../../../config/textErrors.js';
import BaseView from '../../view/baseView.js';
import LinkedButton from '../../../components/buttons/linkedButton.js';
import {selectorMap} from '../../../config/selectorMap.js';
import MuteButton from '../../../components/buttons/muteButton.js';
import LogoutButton from '../../../components/buttons/logoutButton.js';


export default class MenuView extends BaseView {
  constructor() {
    super('js/views/pages/MainMenuView/MainMenuView.tmpl');

    //create navBar elements
    new MuteButton(this.el, selectorMap.MUTE_BUTTON);
    new LinkedButton(this.el, selectorMap.SETTINGS_BUTTON, 'Settings', undefined);

    //create menu elements
    new LinkedButton(this.el, selectorMap.PLAY_BUTTON, 'Play', undefined);
    new LinkedButton(this.el, selectorMap.HELP_BUTTON, 'Help', undefined);
  }

  render() {
    userService.getUser()
      .then((user) => {
        if (!user) {
          new LinkedButton(this.el, selectorMap.LOGIN_BUTTON, 'Login', undefined);
          new LinkedButton(this.el, selectorMap.SIGN_UP_BUTTON, 'Signup', undefined);
        } else {
          new LinkedButton(this.el, selectorMap.PROFILE_BUTTON, 'Profile', user.getProfileData());
          new LogoutButton(this.el, selectorMap.LOGOUT_BUTTON);
        }
        new LinkedButton(this.el, selectorMap.LEADER_BOARD_BUTTON, 'LeaderBoard', undefined);
        super.render();
        //TODO: обработать неуспешный выход
      })
      .catch((error) => {
        Logger.error(error);

        super.render();
        //this.textError.innerHTML = fetchFaildErrors.noConnection;
      });

    return this;
  }

}
