import {selector} from '../../../config/selector.js';

export default class BackButton {

  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    this.backButton = element.querySelector(selector.BACK_BUTTON);
    this.backButton.style.display = 'block';
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