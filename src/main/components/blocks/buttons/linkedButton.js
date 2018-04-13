import {selector} from '../../../config/selector.js';

export default class LinkedButton {

  /**
   * @param {HTMLElement} element
   * @param {String} className
   * @param {String} type //button's name
   * @param {Object} data //ex: {username: 'kk111'} for profile
   *
   */
  constructor(element, className, text='', data, path = '') {
    this.linkedButton = element.querySelector(className);
    this.linkedButton.style.display = 'block';
    this.a = this.linkedButton.getElementsByTagName('a')[0];
    this.a.href = path;

    if (this.className === selector.PROFILE_BUTTON) {
      this.a.innerText = data.username;
    } else {
      this.a.innerText = text;
    }
  }

  render() {
    return this.linkedButton;
  }
}