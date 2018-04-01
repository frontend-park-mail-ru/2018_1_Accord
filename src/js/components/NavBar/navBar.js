import {navObjects} from '../../utils/views/viewsObjects.js';


export default class NavBar {

  /**
   * navState = {
   *  userdata: {username},
   *  state: undefined | settings | menu
   * }
   * @param {Object} navState
   */
  constructor(navState) {
    this.userData = navState.userData;
    this.state = navState.state;
    this.navBar = [];
  }

  /**
   *
   * @return {Array|*}
   */
  render() {
    const navObj = navObjects(this.userData);

    if (!this.userData) {
      switch(this.state) {
        case 'menu':
          this.navBar = [
            navObj.back,
            navObj.settings
          ];
          break;

        case 'settings':
          this.navBar = [
            navObj.back,
            navObj.login,
            navObj.signUp,
          ];
          break;

        default:
          this.navBar = [
            navObj.back,
            navObj.login,
            navObj.signUp,
            navObj.settings
          ];
          break;
      }
    } else {
      switch(this.state) {
        case 'menu':
          this.navBar = [
            navObj.back,
            navObj.profile,
            navObj.settings
          ];
          break;

        case 'settings':
          this.navBar = [
            navObj.back,
            navObj.profile,
            navObj.logout
          ];
          break;

        default:
          this.navBar = [
            navObj.back,
            navObj.profile,
            navObj.logout,
            navObj.settings
          ];
          break;
      }
    }



    return this.navBar;
  }
}