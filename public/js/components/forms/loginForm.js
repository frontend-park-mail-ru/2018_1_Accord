import Form from './form.js';
import InputForm from '../blocks/input.js';
import Button from '../blocks/button.js';
import Validator from '../../modules/validation/validation.js';
import {disposableListener} from '../../utils/helperFuncs.js';

export default class LoginForm extends Form {
  constructor() {
    super();
  }

  getFormData() {
    return {
      email: this.Email.getData(),
      password: this.Password.getData()
    };
  }

  render() {
    this.Email = new InputForm('text', 'Enter your e-mail...');
    this.Password = new InputForm('password', 'Enter your password...');
    this.ButtonSubmit = new Button('submit', 'Log in');

    this.Email.onInputChange(this.validateEmail.bind(this));
    this.Password.onInputChange(this.validatePassword.bind(this));

    this.formElement.appendChild(this.Email.render());
    this.formElement.appendChild(this.Password.render());
    this.formElement.appendChild(this.ButtonSubmit.render());

    this.formElement.addEventListener('submit', (event) => event.preventDefault());

    return this.formElement;
  }

  onSubmit(callback) {
    return disposableListener(this.formElement, 'submit', callback);
  }

  checkFormState() {
    return new Promise((resolve, reject) => {
      if (this.Email.getState() && this.Password.getState()) {
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
}