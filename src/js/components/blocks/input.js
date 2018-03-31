import Block from './block.js';

export default class InputForm extends Block{

  /**
   * inputData is an Object
   * contains input type and placeholder
   *
   * @param {Object} inputData
   */
  constructor(inputData) {
    super();
    this.inputDomElement = document.createElement('input');
    this.inputDomElement.type = inputData.type;
    this.inputDomElement.placeholder = inputData.placeholder;

    this.divInputElement = document.createElement('div');
    this.divInputElement.appendChild(this.inputDomElement);

    this.state = false;
    this.errorElement = document.createElement('div');
    this.divInputElement.appendChild(this.errorElement);
  }

  render() {
    return this.divInputElement;
  }

  getState() {
    return this.state;
  }

  getData() {
    return this.inputDomElement.value;
  }

  setError(error) {
    if (error) {
      this.state = false;
      this.errorElement.innerHTML = error;
      this.errorElement.style.display = 'block';
    } else {
      this.state = true;
      this.errorElement.style.display = 'none';
    }
  }

  onInputChange(callback) {
    this.inputDomElement.addEventListener('change', (event) => {
      event.preventDefault();
      callback();
    });

  }

}