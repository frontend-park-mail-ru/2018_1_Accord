import {selector} from '../../config/selector.js';

export default class Input {

  /**
   * @param {HTMLElement} element
   * @param {String} inputName
   */
  constructor(element, inputName) {
    this.input = element.querySelector(`${selector.INPUT} input[name=${inputName}]`);
    this.errorStatus = false;
  }

  render() {
    return this;
  }

  getData() {
    return this.input.value;
  }

  getStatus() {
    return this.errorStatus;
  }

  setStatus(errorStatus) {
    this.errorStatus = errorStatus;
  }

  onInput(callback, inputField, errField) {
    this.input.addEventListener('input', (event) => {
      event.preventDefault();
      if (this.errorStatus) {
        this.errorStatus = false;
        errField.innerText = '';
        inputField.style.border = 'solid 2px transparent';
      }
    });

    this.input.addEventListener('change', (event) => {
      event.preventDefault();
      callback();
    });
  }

}