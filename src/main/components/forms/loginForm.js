import Input from '../blocks/input.js';

import Validator from '../../modules/validation/validation.js';
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
    this.errorField.style.display = 'block';

    this.email.onInput(this.validateEmail.bind(this), this.email.input, this.errorField);
    this.password.onInput(this.validatePassword.bind(this), this.password.input, this.errorField);
  }

  render() {
    return this;
  }

  onSubmit(callback) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      callback();
    });
  }

  getFormData() {
    return {
      email: this.email.getData(),
      password: this.password.getData()
    };
  }

  checkFormState() {
    if (!this.email.getStatus() && !this.password.getStatus()) {
      return this.getFormData();
    }
  }

  validateEmail() {
    const formState = Validator.checkEmail(this.email.getData());
    if (!formState.state) {
      this.errorField.innerText = `${formState.errMessage}\n`;
      this.errorField.style.display = 'block';
      this.email.input.style.border = 'solid 2px #F5192F';
      // this.email.input.className = 'form__field-input input-invalid';

      this.email.setStatus(true);
    } else {
      this.email.input.style.border = 'solid 2px green';
      // this.email.input.className = 'form__field-input input-valid';
    }
  }

  validatePassword() {
    const formState = Validator.checkPassword(this.password.getData());
    if (!formState.state) {
      this.errorField.innerText = `${formState.errMessage}\n`;
      this.errorField.style.display = 'block';
      this.password.input.style.border = 'solid 2px #F5192F';
      // this.password.input.className = 'form__field-input input-invalid';

      this.password.setStatus(true);
    } else {
      this.password.input.style.border = 'solid 2px green';
      // this.password.input.className = 'form__field-input input-valid';
    }
  }
}