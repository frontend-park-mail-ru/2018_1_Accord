import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import NavBar from '../../../components/blocks/navBar/navBar.js';
import LoginForm from '../../../components/forms/loginForm.js';
import {serverErrors} from '../../../config/textErrors.js';
import Router from '../../../modules/router.js';
import Logger from '../../../utils/logger.js';
import userService from '../../../services/UserService.js';

export default class LoginView extends BaseView {
  constructor() {
    super('js/views/pages/LoginView/LoginView.tmpl');

    this.navBar = [selector.BACK_BUTTON,
      selector.MUTE_BUTTON,
      selector.SETTINGS_BUTTON];
  }

  async render() {
    super.render();

    this.error = this.el.querySelector(selector.LOGIN_ERROR);
    this.loginForm = new LoginForm(this.el).render();

    async function submitCallback(event) {
      event.preventDefault();
      this.formStateData = await this.loginForm.checkFormState();
      this.user = await userService.login(this.formStateData);

      try {
        if (!this.user) {
          this.loginForm.onSubmit(submitCallback);
          this.error.innerText = serverErrors.login;
          this.error.style.display = 'block';
          Logger.log('Unsuccessful login');

        } else {
          Router.changeSection('Menu');
        }

      } catch (err) {
        this.loginForm.onSubmit(submitCallback);

        this.error.innerText = serverErrors.unexpected;
        this.error.style.display = 'block';
        Logger.error(err);
        //TODO:Error dispatcher
      }

    }

    this.loginForm.onSubmit(submitCallback);
    new NavBar(this.el, this.navBar, this.user);

    return this.el;
  }

}