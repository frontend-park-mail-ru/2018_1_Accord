import {selector} from '../../../config/selector.js';
import BackButton from '../../buttons/backButton.js';
import LinkedButton from '../../buttons/linkedButton.js';
import MuteButton from '../../buttons/muteButton.js';

export default class NavBar {

  /**
   *
   * @param {HTMLElement} element
   * @param {Array<String>} selectors
   * @param {User} userdata
   */
  constructor(element, selectors, userdata) {
    this.navBar = element.querySelector(selector.NAV_BAR);

    this.user = userdata;
    this.selectors = selectors;

    this.selectors.forEach((value) => {
      switch (value) {
        case selector.BACK_BUTTON:
          new BackButton(this.navBar);
          break;

        case selector.PROFILE_BUTTON:
          new LinkedButton(this.navBar, selector.PROFILE_BUTTON,
            'Profile', this.user.getProfileData());
          break;

        case selector.MUTE_BUTTON:
          new MuteButton(this.navBar, selector.MUTE_BUTTON);
          break;

        case selector.SETTINGS_BUTTON:
          new LinkedButton(this.navBar, selector.SETTINGS_BUTTON, 'Settings', undefined);
          break;
      }
    });
  }
}