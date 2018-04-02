import Router from '../../modules/router.js';

export default class BackButton {

  /**
   *
   * @param {String} cssClassName
   * @param {String} backView - path of the view to go back
   */
  constructor(cssClassName, backView) {
    this.backButton = document.createElement('button');
    this.backButton.innerHTML = 'Back';
    this.backButton.className = cssClassName;
    this._onClick(backView);
  }

  render() {
    return this.backButton;
  }

  /**
   *
   * @param {String} backView
   * @private
   */
  _onClick(backView) {
    this.backButton.addEventListener('click', (event) => {
      event.preventDefault();
      Router.goTo();
    });
  }
}