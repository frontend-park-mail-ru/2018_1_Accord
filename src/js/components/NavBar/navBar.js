import ProfileButton from '../blocks/profileButton.js';

export default class NavBar {

  /**
   * @param {HTMLElement} tmpl
   *
   * navState = {
   *  userdata: username | undefined,
   *  state: menu | settings | game
   * }
   * @param {Object} navState
   */
  constructor(tmpl, navState) {
    this.userData = navState.userData;
    this.state = navState.state;

    this.elements = [];

    if (this.userData) {
      this.profileButton = new ProfileButton(this.userData);
      this.elements.push(this.profileButton);
    }

  }

  /**
   *
   * @return {Array|*}
   */
  render() {
    //render
  }
}