export default class BackButton {

  /**
   *
   * @param {String} className
   */
  constructor(className) {
    this.backButton = document.querySelector();
    this.backButton.innerText = 'Back';
    this._onClick(className);
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