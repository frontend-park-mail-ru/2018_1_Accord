import Input from '../blocks/input.js';

import Validator from '../../modules/validation/validation.js';
import {disposableListener} from '../../utils/helperFuncs.js';
import {selector} from '../../config/selector.js';

export default class LoginForm {

  /**
   *
   * @param {HTMLElement} element
   */
  constructor(element) {
    this.form = element.querySelector(selector.FORM);

    this.email = new Input(this.form, 'email').render();
    this.password = new Input(this.form, 'password').render();

    this.submit = this.form.querySelector(selector.SUBMIT_BUTTON);
    this.errorField = element.querySelector(selector.VALIDATE_ERR);

    this.email.onInput(this.validateEmail, this.errorField);
    this.password.onInput(this.validatePassword, this.errorField);
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
      password: this.password.getData()
    };
  }

  checkFormState() {
    return new Promise((resolve, reject) => {
      if (this.email.getStatus() && this.password.getStatus()) {
        resolve(this.getFormData());
      } else {
        reject();
      }
    });
  }

  validateEmail() {
    const formState = Validator.checkEmail(this.email.getData());
    this.errorField.innerText += `${formState.errMessage}\n`;
  }

  validatePassword() {
    const formState = Validator.checkPassword(this.password.getData());
    this.errorField.innerText += `${formState.errMessage}\n`;
  }
}