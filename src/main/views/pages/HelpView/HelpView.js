import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import userService from '../../../services/UserService.js';
import NavBar from '../../../components/blocks/navBar/navBar.js';
import Logger from '../../../utils/logger.js';
import {fetchFaildErrors} from '../../../config/textErrors.js';

export default class HelpView extends BaseView {
  constructor() {
    super('main/views/pages/HelpView/HelpView.tmpl');
  }

  async render() {
    super.render();

    this.help = this.el.querySelector(selector.HELP_VIEW);

    this.errorField = this.help.querySelector(selector.HELP_ERROR);
    this.errorField.style.display = 'none';

    this.navBar = [
      selector.MUTE_BUTTON,
      selector.BACK_BUTTON,
      selector.SETTINGS_BUTTON
    ];

    try {
      this.user = await userService.getUser();

      if (this.user) {
        this.navBar = [
          selector.MUTE_BUTTON,
          selector.BACK_BUTTON,
          selector.SETTINGS_BUTTON,
          selector.PROFILE_BUTTON
        ];
      }
    } catch (err) {
      this.errorField.innerText = fetchFaildErrors.noConnection;
      this.errorField.style.display = 'block';
      Logger.error(err);
    }

    new NavBar(this.help, this.navBar, this.user);
    return this;
  }
}
