import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import NavBar from '../../../components/blocks/navBar/navBar.js';
import LoginForm from '../../../components/forms/loginForm.js';
import {serverErrors} from '../../../config/textErrors.js';
import Router from '../../../modules/router.js';
import Logger from '../../../utils/logger.js';
import userService from '../../../services/UserService.js';
import {inputData} from '../../../config/inputData.js';

export default class LoginView extends BaseView {
  constructor() {
    super('js/views/pages/LoginView/LoginView.tmpl',
      {
        form: [
          inputData.email,
          inputData.password
        ],
        submitText: 'Login'
      }
    );

    this.navBar = [selector.BACK_BUTTON,
      selector.MUTE_BUTTON,
      selector.SETTINGS_BUTTON];

    new NavBar(this.el, this.navBar, undefined);

    this.loginError = this.el.querySelector(selector.LOGIN_ERROR);
    this.loginForm = new LoginForm(this.el).render();
  }

  render() {
    const submitCallback = (event) => {
      event.preventDefault();

      this.loginForm.checkFormState()
        .then((userData) => userService.login(userData))
        .then((user) => {
          if (!user) {
            this.loginForm.onSubmit(submitCallback);

            this.loginError.innerText = serverErrors.login;
            this.loginError.style.display = 'block';
            Logger.log('Unsuccessful login');

          } else {
            Router.changeSection('Menu');
          }
          super.render();
        })
        .catch((err) => {
          this.loginForm.onSubmit(submitCallback);

          this.loginError.innerText = serverErrors.unexpected;
          this.loginError.style.display = 'block';

          Logger.error(err);
          super.render();
          //TODO:Error dispatcher
        });
    };

    this.loginForm.onSubmit(submitCallback);

    return this.el;
  }

}