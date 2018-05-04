import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import NavBar from '../../../components/blocks/navBar/navBar.js';
import LoginForm from '../../../components/forms/loginForm.js';
import {serverErrors} from '../../../config/textErrors.js';
import Logger from '../../../utils/logger.js';
import userService from '../../../services/UserService.js';
import {pagePaths} from '../../../config/pagePaths.js';
import EventBus from '../../../modules/eventBus.js';
import {events} from '../../../modules/events.js';

export default class LoginView extends BaseView {
  constructor() {
    super('main/views/pages/LoginView/LoginView.tmpl');

    this.navBar = [selector.BACK_BUTTON,
      selector.MUTE_BUTTON,
      selector.SETTINGS_BUTTON];
  }

  render() {
    super.render({
      signUpPath: pagePaths.SIGN_UP_PATH
    });

    this.loader.style.display = 'none';

    new NavBar(this.el, this.navBar, this.user);
    this.error = this.el.querySelector(selector.LOGIN_ERROR);
    this.loginForm = new LoginForm(this.el).render();

    this.loginForm.onSubmit(() => {
      this.formStateData = this.loginForm.checkFormState();

      if (this.formStateData) {
        userService.login(this.formStateData)
          .then((user) => {
            if (!user) {
              this.error.innerText = serverErrors.login;
              this.error.style.display = 'block';
              Logger.log('Unsuccessful login');
            } else {
              EventBus.emit(events.ROUTE.LOGIN);
              window.history.pushState(null, '', pagePaths.START_PATH);
            }
          })
          .catch((error) => {
            this.error.innerText = serverErrors.unexpected;
            this.error.style.display = 'block';
            Logger.error(error);
            //TODO:Error dispatcher
          });
      }
    });

    return this;
  }

}
