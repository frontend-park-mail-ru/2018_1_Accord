import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import userService from '../../../services/UserService.js';
import NavBar from '../../../components/blocks/navBar/navBar.js';
import Logger from '../../../utils/logger.js';
import {fetchFaildErrors} from '../../../config/textErrors.js';

export default class HelpView extends BaseView {
  constructor() {
    super('main/views/pages/HelpView/HelpView.tmpl');

    this.navBar = [
      selector.MUTE_BUTTON,
      selector.BACK_BUTTON,
      selector.SETTINGS_BUTTON
    ];
  }

  render() {
    super.render();

    this.loader.style.display = 'none';
    this.help = this.el.querySelector(selector.HELP_VIEW);

    this.errorField = this.help.querySelector(selector.HELP_ERROR);
    this.errorField.style.display = 'none';

    userService.getUser()
      .then((user) => {
        if (user) {
          this.navBar = [
            selector.MUTE_BUTTON,
            selector.BACK_BUTTON,
            selector.SETTINGS_BUTTON,
            selector.PROFILE_BUTTON
          ];
        }
        new NavBar(this.help, this.navBar, this.user);
      })
      .catch((error) => {
        this.errorField.innerText = fetchFaildErrors.noConnection;
        this.errorField.style.display = 'block';
        Logger.error(error);

        new NavBar(this.help, this.navBar, this.user);
      });

    return this;
  }
}
