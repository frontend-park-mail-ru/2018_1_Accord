import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import NavBar from '../../../components/blocks/navBar/navBar.js';
import LoginForm from '../../../components/forms/loginForm.js';
import {serverErrors} from '../../../config/textErrors.js';
import Logger from '../../../utils/logger.js';
import userService from '../../../services/UserService.js';
import {pagePaths} from '../../../config/pagePaths.js';

export default class LoginView extends BaseView {
  constructor() {
    super('main/views/pages/LoginView/LoginView.tmpl');

    this.navBar = [selector.BACK_BUTTON,
      selector.MUTE_BUTTON,
      selector.SETTINGS_BUTTON];
  }

  async render() {
    super.render({
      signUpPath: pagePaths.SIGN_UP_PATH
    });

    this.error = this.el.querySelector(selector.LOGIN_ERROR);
    this.loginForm = new LoginForm(this.el).render();

    this.loginForm.onSubmit(async () => {
      //validation check
      this.formStateData = this.loginForm.checkFormState();

      if (this.formStateData) {
        this.user = await userService.login(this.formStateData);

        try {
          if (!this.user) {
            this.error.innerText = serverErrors.login;
            this.error.style.display = 'block';
            Logger.log('Unsuccessful login');

          } else {
            window.history.pushState(null, '', pagePaths.START_PATH);
          }

        } catch (err) {
          this.error.innerText = serverErrors.unexpected;
          this.error.style.display = 'block';
          Logger.error(err);
          //TODO:Error dispatcher
        }
      }
    });

    new NavBar(this.el, this.navBar, this.user);

    return this;
  }

}
