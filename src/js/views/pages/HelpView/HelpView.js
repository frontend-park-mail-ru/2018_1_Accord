import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import userService from '../../../services/UserService.js';
import NavBar from '../../../components/blocks/navBar/navBar.js';
import Logger from '../../../utils/logger.js';
import {fetchFaildErrors} from '../../../config/textErrors.js';

export default class HelpView extends BaseView {
  constructor() {
    super('js/views/pages/HelpView/HelpView.tmpl');

    this.navBar = [selector.MUTE_BUTTON, selector.BACK_BUTTON, selector.SETTINGS_BUTTON];
    this.help = this.el.querySelector(selector.HELP_VIEW);

    this.errorField = this.help.querySelector(selector.HELP_ERROR);
    this.errorField.style.display = 'none';
  }

  render() {
    userService.getUser()
      .then((user) => {
        if (!user) {
          new NavBar(this.help, this.navBar, undefined);
        } else {
          this.navBar.push(selector.PROFILE_BUTTON);
        }
      })
      .catch((err) => {
        this.errorField.innerText = fetchFaildErrors.noConnection;
        this.errorField.style.display = 'block';
        Logger.error(err);
      });

    return this.el;
  }
}