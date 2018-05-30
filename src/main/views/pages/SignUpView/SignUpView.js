import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import NavBar from '../../../components/blocks/navBar/navBar.js';
import {serverErrors} from '../../../config/textErrors.js';
import Logger from '../../../utils/logger.js';
import userService from '../../../services/UserService.js';
import SignUpForm from '../../../components/forms/signUpForm.js';
import {pagePaths} from '../../../config/pagePaths.js';
import EventBus from '../../../modules/eventBus.js';
import {events} from '../../../modules/events.js';

export default class SignUpView extends BaseView {
  constructor() {
    super('main/views/pages/SignUpView/SignUpView.tmpl');

    this.navBar = [
      selector.BACK_BUTTON,
      selector.MUTE_BUTTON,
      selector.SETTINGS_BUTTON
    ];
  }

  render() {
    super.render({
      loginPath: pagePaths.LOGIN_PATH
    });

    this.loader.style.display = 'none';

    new NavBar(this.el, this.navBar, this.user);

    this.error = this.el.querySelector(selector.VALIDATE_ERR);
    this.signUpForm = new SignUpForm(this.el).render();

    this.signUpForm.onSubmit(() => {
      this.formStateData = this.signUpForm.checkFormState();

      if (this.formStateData) {
        userService.signUp(this.formStateData)
          .then((user) => {
            if (!user) {
              this.error.innerText = serverErrors.signup;
              this.error.style.display = 'block';
              Logger.log('Unsuccessful signup', user);
            } else {
              Logger.log('successful signup', user);
              EventBus.emit(events.ROUTE.SIGN_UP);
            }
          })
          .catch((error) => {
            this.error.innerText = serverErrors.unexpected;
            this.error.style.display = 'block';
            Logger.error('error in catch of signup: ', error);
            //TODO:Error dispatcher
          });
      }
    });

    return this;
  }

}
