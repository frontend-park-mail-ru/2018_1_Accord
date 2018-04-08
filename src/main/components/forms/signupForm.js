import Input from '../blocks/input.js';

import Validator from '../../modules/validation/validation.js';
import {disposableListener} from '../../utils/helperFuncs.js';
import {selector} from '../../config/selector.js';
import Logger from '../../utils/logger.js';

export default class SignUpForm {

  /**
   *
   * @param {HTMLElement} element
   */
  constructor(element) {
    this.form = element.querySelector(selector.SIGNUP_FORM);

    this.email = new Input(this.form, 'email').render();
    this.username = new Input(this.form, 'username').render();
    this.password = new Input(this.form, 'password').render();
    this.passwordConfirm = new Input(this.form, 'password-confirm').render();

    this.submit = this.form.querySelector(selector.SUBMIT_BUTTON);
    this.errorField = this.form.querySelector(selector.VALIDATE_ERR);

    this.email.onInput(this.validateEmail.bind(this), this.errorField);
    this.password.onInput(this.validatePassword.bind(this), this.errorField);
    this.username.onInput(this.validateUsername.bind(this), this.errorField);
    this.passwordConfirm.onInput(this.confirmPassword.bind(this), this.errorField);
  }

  render() {
    return this;
  }

  onSubmit(callback) {
    return disposableListener(this.form, 'submit', callback);
  }

  getFormData() {
    return {
      email: this.email.getData(),
      password: this.password.getData(),
      nickname: this.username.getData(),
    };
  }

  checkFormState() {
    return new Promise((resolve, reject) => {
      if (!this.email.getStatus() &&
        !this.password.getStatus() &&
        !this.username.getStatus() &&
        !this.passwordConfirm.getStatus()) {

        resolve(this.getFormData());
      } else {
        reject();
      }
    });
  }

  validateEmail() {
    const formState = Validator.checkEmail(this.email.getData());
    if (!formState.state) {
      this.errorField.innerText += `${formState.errMessage}\n`;
      this.errorField.style.display = 'block';

      this.email.setStatus(true);
    }
  }

  validatePassword() {
    const formState = Validator.checkPassword(this.password.getData());
    if (!formState.state) {
      this.errorField.innerText += `${formState.errMessage}\n`;
      this.errorField.style.display = 'block';

      this.password.setStatus(true);
    }
  }

  validateUsername() {
    const formState = Validator.checkUsername(this.username.getData());
    if (!formState.state) {
      this.errorField.innerText += `${formState.errMessage}\n`;
      this.errorField.style.display = 'block';

      this.username.setStatus(true);
    }
  }

  confirmPassword() {
    const formState = Validator.confirmPassword(this.password.getData(), this.passwordConfirm.getData());
    if (!formState.state) {
      Logger.log(this.password, ' --- ', this.passwordConfirm);
      this.errorField.innerText += `${formState.errMessage}\n`;
      this.errorField.style.display = 'block';

      this.passwordConfirm.setStatus(true);
    }
  }
}