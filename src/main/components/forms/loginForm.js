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
    this.form = element.querySelector(selector.LOGIN_FORM);

    this.email = new Input(this.form, 'email').render();
    this.password = new Input(this.form, 'password').render();

    this.submit = this.form.querySelector(selector.SUBMIT_BUTTON);
    this.errorField = this.form.querySelector(selector.VALIDATE_ERR);

    this.email.onInput(this.validateEmail.bind(this), this.errorField);
    this.password.onInput(this.validatePassword.bind(this), this.errorField);
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
      if (!this.email.getStatus() && !this.password.getStatus()) {
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
}