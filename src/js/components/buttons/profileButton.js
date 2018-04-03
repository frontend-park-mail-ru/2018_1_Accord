import Router from '../../modules/router';

export default class ProfileButton {

  /**
   * @param {String} username
   * @param {String} className
   */
  constructor(username, className) {
    this.profileButton = document.querySelector(className);
    this.profileButton.href = ''; //TODO router and routing paths file
    this.profileButton.innerText = username;
    this._onClick();
  }

  render() {
    return this.profileButton;
  }

  hide() {
    this.profileButton.style.display = 'none';
  }

  show() {
    this.profileButton.style.display = 'block';
  }

  /**
   * @private
   */
  _onClick() {
    this.profileButton.addEventListener('click', (event) => {
      event.preventDefault();
      //Router.goTo(PROFILE)
      Router.changeSection('Profile');
    });
  }
}