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

  render() {
    super.render();

    this.error = this.el.querySelector(selector.LOGIN_ERROR);
    this.signUpForm = new LoginForm(this.el).render();
    new NavBar(this.el, this.navBar, undefined);

    const submitCallback = (event) => {
      event.preventDefault();

      this.signUpForm.checkFormState()
        .then((userData) => userService.login(userData))
        .then((user) => {
          if (!user) {
            this.signUpForm.onSubmit(submitCallback);

            this.error.innerText = serverErrors.login;
            this.error.style.display = 'block';
            Logger.log('Unsuccessful login');

          } else {
            Router.changeSection('Menu');
          }
          new NavBar(this.el, this.navBar, undefined);
        })
        .catch((err) => {
          this.signUpForm.onSubmit(submitCallback);

          this.error.innerText = serverErrors.unexpected;
          Logger.log(this.error);
          this.error.style.display = 'block';

          new NavBar(this.el, this.navBar, undefined);
          Logger.error(err);
          //TODO:Error dispatcher
        });
    };

    this.signUpForm.onSubmit(submitCallback);

    return this.el;
  }

}