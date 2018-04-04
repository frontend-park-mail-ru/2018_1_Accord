
export default class BackButton {

  /**
   * @param {HTMLElement} element
   * @param {String} className
   */
  constructor(element, className) {
    this.backButton = element.querySelector(className);
    this.backButton.innerText = 'Back';
    this._onClick();
  }

  render() {
    return this.backButton;
  }

  /**
   * @private
   */
  _onClick() {
    this.backButton.addEventListener('click', (event) => {
      event.preventDefault();
      window.history.back();
    });
  }
}