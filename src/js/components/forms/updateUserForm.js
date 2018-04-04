import Form from './form.js';
import InputForm from '../blocks/input.js';
import {newInputData} from '../../config/inputData.js';

import {disposableListener} from '../../utils/helperFuncs.js';

export default class UpdateUserForm extends Form {

  /**
   * type: 'email' | 'username' | 'password'
   * @param {String} type
   */
  constructor(type) {
    super();
    this.type = type;
  }

  getFormData() {
    return this.input.getData();
  }

  render() {
    switch (this.type) {
      case 'email':
        this.renderEmail();
        break;
      case 'username':
        this.renderUsername();
        break;
      case 'password':
        this.renderPassword();
        break;
    }

    this.formElement.appendChild(this.sendButton.render());

    return this.formElement;
  }

  renderEmail() {
    this.input = new InputForm(newInputData.email);
    this.formElement.appendChild(this.input.render());
  }

  renderUsername() {
    this.input = new InputForm(newInputData.username);
    this.formElement.appendChild(this.input.render());
  }

  renderPassword() {
    this.input = new InputForm(newInputData.password);
    this.formElement.appendChild(this.input.render());
  }

  onSubmit(callback) {
    return disposableListener(this.formElement, 'submit', callback);
  }
}