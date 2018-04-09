import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import NavBar from '../../../components/blocks/navBar/navBar.js';
import {serverErrors} from '../../../config/textErrors.js';
import Router from '../../../modules/router.js';
import Logger from '../../../utils/logger.js';
import userService from '../../../services/UserService.js';
import SignUpForm from '../../../components/forms/signUpForm.main';
import {pagePaths} from '../../../config/pagePaths.js';

export default class SignUpView extends BaseView {
  constructor() {
    super('main/views/pages/SignUpView/SignUpView.tmpl');

    this.navBar = [selector.BACK_BUTTON,
      selector.MUTE_BUTTON,
      selector.SETTINGS_BUTTON];
  }

  render() {
    super.render({
      loginPath: pagePaths.LOGIN_PATH
    });

    new NavBar(this.el, this.navBar, undefined);
    this.error = this.el.querySelector(selector.SIGNUP_ERROR);
    this.signUpForm = new SignUpForm(this.el).render();

    const submitCallback = (event) => {
      event.preventDefault();

      this.signUpForm.checkFormState()
        .then((userData) => userService.signUp(userData))
        .then((user) => {
          if (!user) {
            this.signUpForm.onSubmit(submitCallback);

            this.error.innerText = serverErrors.signup;
            this.error.style.display = 'block';

            Logger.log('Unsuccessful signup');

          } else {
            window.history.pushState(null, '', pagePaths.START_PATH);
          }
        })
        .catch((err) => {
          this.signUpForm.onSubmit(submitCallback);

          this.error.innerText = serverErrors.unexpected;
          this.error.style.display = 'block';

          Logger.error(err);
          //TODO:Error dispatcher
        });
    };

    this.signUpForm.onSubmit(submitCallback);

    return this;
  }

}