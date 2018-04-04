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

  onInput(callback, errField) {
    this.input.addEventListener('input', (event) => {
      event.preventDefault();
      if (this.errorStatus) {
        this.errorStatus = false;
        errField.style.display = 'none';
      }
    });

    this.input.addEventListener('change', (event) => {
      event.preventDefault();
      callback();
    });
  }

}