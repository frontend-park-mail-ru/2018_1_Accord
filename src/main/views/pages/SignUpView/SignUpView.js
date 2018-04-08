import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import NavBar from '../../../components/blocks/navBar/navBar.js';
import {serverErrors} from '../../../config/textErrors.js';
import Router from '../../../modules/router.js';
import Logger from '../../../utils/logger.js';
import userService from '../../../services/UserService.js';
import SignUpForm from '../../../components/forms/signUpForm.js';

export default class SignUpView extends BaseView {
  constructor() {
    super('main/views/pages/SignUpView/SignUpView.tmpl');

    this.navBar = [
      selector.BACK_BUTTON,
      selector.MUTE_BUTTON,
      selector.SETTINGS_BUTTON
    ];
  }

  async render() {
    super.render();

    this.error = this.el.querySelector(selector.SIGNUP_ERROR);
    this.loginForm = new SignUpForm(this.el).render();

    this.loginForm.onSubmit(async () => {
      this.formStateData = await this.loginForm.checkFormState();

      if (this.formStateData) {
        //validation check
        this.user = await userService.signUp(this.formStateData);

        try {
          if (!this.user) {
            this.error.innerText = serverErrors.signup;
            this.error.style.display = 'block';
            Logger.log('Unsuccessful signup');

          } else {
            Router.changeSection('Menu');
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

    return this.el;
  }

}