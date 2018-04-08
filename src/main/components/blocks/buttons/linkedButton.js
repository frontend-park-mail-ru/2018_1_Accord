
export default class LinkedButton {

  /**
   * @param {HTMLElement} element
   * @param {String} className
   * @param {String} type //button's name
   * @param {Object} data //ex: {username: 'kk111'} for profile
   *
   */
  constructor(element, className, type, data, path = '') {
    this.linkedButton = element.querySelector(className);
    this.linkedButton.style.display = 'block';
    this.type = type;
    this.a = this.linkedButton.getElementsByTagName('a')[0];
    this.a.href = path; //TODO router and routing paths file

    if (this.type === 'Profile') {
      this.a.innerText = data.username;
    } else {
      this.a.innerText = type;
    }
  }

  render() {
    return this.linkedButton;
  }
}