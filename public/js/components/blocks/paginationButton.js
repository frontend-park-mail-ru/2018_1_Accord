import Button from './button.js';

export default class PaginationButton extends Button {
  constructor(type, value) {
    super(type, value);
  }

  setValue(value) {
    this.buttonDomElement.innerHTML = value;
  }

  render() {
    return this.buttonDomElement;
  }
}
