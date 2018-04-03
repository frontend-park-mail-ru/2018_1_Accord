import {selectorMap} from '../../config/selectorMap.js';

export default class ProfileButton {

  /**
   *
   * @param {String} username
   */
  constructor(username) {
    this.profileButton = document.createElement('a');
    this.profileButton.href = '';
    this.profileButton.innerText = username;
    this.profileButton.className = selectorMap.PROFILE_BUTTON;
  }

  render() {
    return this.profileButton;
  }
}