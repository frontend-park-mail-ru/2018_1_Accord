import userService from '../../services/UserService.js';
import Router from '../../modules/router.js';
import Logger from '../../utils/logger.js';
import {selector} from '../../config/selector.js';

export default class LogoutButton {

  /**
   * @param {HTMLElement} element
   * @param {String} className
   */
  constructor(element, className) {
    this.errorField = element.querySelector(selector.MAIN_ERROR);
    this.errorField.style.display = 'block';

    this.logoutButton = element.querySelector(className);
    this.logoutButton.style.display = 'block';
    this.logoutButton.innerText = 'Logout';
    this._onClick();
  }

  render() {
    return this.logoutButton;
  }

  /**
   * @var {Error} error
   * @private
   */
  _onClick() {
    this.logoutButton.addEventListener('click', (event) => {
      event.preventDefault();
      userService.logout()
        .then(() => {
          history.pushState(null, '', '/');
          Logger.log('Logout successfully');
        })
        .catch((error) => {
          this.errorField.innerText = error.message;
          Logger.error(error);
        });
    });
  }
}