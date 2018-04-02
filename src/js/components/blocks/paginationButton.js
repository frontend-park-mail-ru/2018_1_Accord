export default class PaginationButton {
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
