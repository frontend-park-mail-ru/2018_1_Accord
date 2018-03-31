import Button from './button.js';
import Router from '../../modules/router.js';

export default class BackButton extends Button {

  /**
   *
   * @param {String} backSection
   */
  constructor(backSection) {
    super('button', 'Back');
    this.backSection = backSection;
  }

  onClick() {
    this.buttonDomElement.addEventListener('click', (event) => {
      event.preventDefault();
      Router.changeSection(this.backSection);
    });
  }
}