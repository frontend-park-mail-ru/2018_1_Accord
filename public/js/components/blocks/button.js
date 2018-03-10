import Block from './block.js';

export default class Button extends Block {
  constructor(type, value) {
    super();
    this.buttonDiv = document.createElement('div');

    this.buttonDomElement = document.createElement('button');
    this.buttonDomElement.type = type;
    this.buttonDomElement.innerHTML = value;

    this.buttonDiv.appendChild(this.buttonDomElement);
  }

  render() {
    return this.buttonDiv;
  }

  onClick(callback) {
    this.buttonDomElement.addEventListener('click', (event) => {
      event.preventDefault();
      callback();
    });
  }
}