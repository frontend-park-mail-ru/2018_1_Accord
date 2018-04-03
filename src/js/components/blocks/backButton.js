import Router from '../../modules/router.js';
import {selectorMap} from '../../config/selectorMap.js';

export default class BackButton {

  /**
   *
   * @param {String} curView - path of the view to go back
   */
  constructor(curView) {
    this.backButton = document.createElement('button');
    this.backButton.innerText = 'Back';
    this.backButton.className = selectorMap.BACK_BUTTON;
    this._onClick(curView);
  }

  render() {
    return this.backButton;
  }

  /**
   *
   * @param {String} curView
   * @private
   */
  _onClick(curView) {
    this.backButton.addEventListener('click', (event) => {
      event.preventDefault();
      Router.back(curView);
    });
  }
}