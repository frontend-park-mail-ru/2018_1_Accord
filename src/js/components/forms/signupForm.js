import Form from './form.js';
import InputForm from '../blocks/input.js';

import Validator from '../../modules/validation/validation.js';
import {disposableListener} from '../../utils/helperFuncs.js';
import {inputData} from '../../config/inputData.js';


export default class SignupForm extends Form {
  constructor() {
    super();
  }

  render() {
    this.Email = new InputForm(inputData.email);
    this.Username = new InputForm(inputData.username);
    this.Password = new InputForm(inputData.password);
    this.PasswordConfirm = new InputForm(inputData.passwordConfirm);

    this.Email.onInputChange(this.validateEmail.bind(this));
    this.Username.onInputChange(this.validateUsername.bind(this));
    this.Password.onInputChange(this.validatePassword.bind(this));
    this.PasswordConfirm.onInputChange(this.confirmPassword.bind(this));

    this.formElement.appendChild(this.Email.render());
    this.formElement.appendChild(this.Username.render());
    this.formElement.appendChild(this.Password.render());
    this.formElement.appendChild(this.PasswordConfirm.render());

    this.formElement.addEventListener('submit', (event) => event.preventDefault());
    return this.formElement;
  }

  getFormData() {
    return {
      email: this.Email.getData(),
      password: this.Password.getData(),
      nickname: this.Username.getData()
    };
  }

  onSubmit(callback) {
    return disposableListener(this.formElement, 'submit', callback);
  }

  checkFormState() {
    return new Promise((resolve, reject) => {
      if (this.Email.getState() &&
                this.Password.getState() &&
                this.Username.getState() &&
                this.PasswordConfirm.getState()) {
        resolve(this.getFormData());
      } else {
        reject();
      }

    });
  }

  validateEmail() {
    const formState = Validator.checkEmail(this.Email);
    this.Email.setError(formState.errMessage);
  }

  validatePassword() {
    const formState = Validator.checkPassword(this.Password);
    this.Password.setError(formState.errMessage);
  }

  validateUsername() {
    const formState = Validator.checkUsername(this.Username);
    this.Username.setError(formState.errMessage);
  }

  confirmPassword() {
    const formState = Validator.confirmPassword(this.Password, this.PasswordConfirm);
    this.PasswordConfirm.setError(formState.errMessage);
  }
}