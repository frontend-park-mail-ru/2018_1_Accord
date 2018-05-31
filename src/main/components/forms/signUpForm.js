import Input from '../blocks/input.js';

import Validator from '../../modules/validation/validation.js';
import {selector} from '../../config/selector.js';

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

    this.email.onInput(this.validateEmail.bind(this), this.email.input, this.errorField);
    this.password.onInput(this.validatePassword.bind(this), this.password.input, this.errorField);
    this.username.onInput(this.validateUsername.bind(this), this.username.input, this.errorField);
    this.passwordConfirm.onInput(this.confirmPassword.bind(this), this.confirmPassword.input, this.errorField);
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
      email: `${this.email.getData()}`,
      password: `${this.password.getData()}`,
      nickname: `${this.username.getData()}`,
    };
  }

  checkFormState() {
    if (!this.email.getStatus() &&
      !this.password.getStatus() &&
      !this.username.getStatus() &&
      !this.passwordConfirm.getStatus()) {

      return this.getFormData();
    }
  }

  validateEmail() {
    const formState = Validator.checkEmail(this.email.getData());
    if (!formState.state) {
      this.errorField.innerText = `${formState.errMessage}\n`;
      this.errorField.style.display = 'block';
      this.email.input.style.border = 'solid 2px #F5192F';

      this.email.setStatus(true);
    } else {
      this.email.input.style.border = 'solid 2px green';
      // this.email.input.className = 'form__field-input input-valid';

      if( this.checkFormState() ) {
        this.errorField.innerText = '';
      }
    }
  }

  validatePassword() {
    const formState = Validator.checkPassword(this.password.getData());
    if (!formState.state) {
      this.errorField.innerText = `${formState.errMessage}\n`;
      this.errorField.style.display = 'block';
      this.password.input.style.border = 'solid 2px #F5192F';

      this.password.setStatus(true);
    } else {
      this.password.input.style.border = 'solid 2px green';
      // this.password.input.className = 'form__field-input input-valid';

      if( this.checkFormState() ) {
        this.errorField.innerText = '';
      }
    }
  }

  validateUsername() {
    const formState = Validator.checkUsername(this.username.getData());
    if (!formState.state) {
      this.errorField.innerText = `${formState.errMessage}\n`;
      this.errorField.style.display = 'block';

      this.username.setStatus(true);
      this.username.input.style.border = 'solid 2px #F5192F';
    }  else {
      this.username.input.style.border = 'solid 2px green';
      // this.password.input.className = 'form__field-input input-valid';

      if( this.checkFormState() ) {
        this.errorField.innerText = '';
      }
    }
  }

  confirmPassword() {
    const formState = Validator.confirmPassword(this.password.getData(), this.passwordConfirm.getData());
    if (!formState.state) {
      this.errorField.innerText = `${formState.errMessage}\n`;
      this.errorField.style.display = 'block';

      this.passwordConfirm.setStatus(true);
      this.passwordConfirm.input.style.border = 'solid 2px #F5192F';
    }  else {
      this.passwordConfirm.input.style.border = 'solid 2px green';
      // this.password.input.className = 'form__field-input input-valid';

      if( this.checkFormState() ) {
        this.errorField.innerText = '';
      }
    }
  }
}
