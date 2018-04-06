'use strict';


export default class BaseView {
  constructor(name) {
    this.tmpl = window.fest[name];
    this.el = document.createElement('div');
  }

  render(attrs) {
    this.el.innerHTML = this.tmpl(attrs);
    return this;
  }

  hide() {
    this.el.setAttribute('hidden', 'hidden');
    return this;
  }

  show() {
    this.el.removeAttribute('hidden');
    return this;
  }

  destroy() {
    this.el.innerHTML = '';
    return this;
  }

  /**
   *
   * @param {HTMLElement} root
   */
  renderTo(root) {
    root.appendChild(this.el);
    return this;
  }
}