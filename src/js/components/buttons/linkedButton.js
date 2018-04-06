import Router from '../../modules/router.js';

export default class LinkedButton {

  /**
   * @param {HTMLElement} element
   * @param {String} className
   * @param {String} type //button's name
   * @param {Object} data //ex: {username: 'kk111'} for profile
   *
   */
  constructor(element, className, type, data) {
    this.linkedButton = element.querySelector(className);
    this.linkedButton.style.display = 'block';
    this.type = type;
    this.linkedButton.href = ''; //TODO router and routing paths file

    if (this.type === 'Profile') {
      this.linkedButton.innerText = data.username;
    } else {
      this.linkedButton.innerText = type;
    }

    this._onClick();
  }

  render() {
    return this.linkedButton;
  }

  /**
   * @private
   */
  _onClick() {
    this.linkedButton.addEventListener('click', (event) => {
      event.preventDefault();
      //Router.goTo(PROFILE)
      Router.changeSection(this.type);
    });
  }
}