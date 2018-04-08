import Button from './button.js';
import SectionDispatcher from '../../modules/SectionDispatcher.js';

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
      SectionDispatcher.changeSection(this.backSection);
    });
  }
}