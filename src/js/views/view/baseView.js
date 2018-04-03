'use strict';


export default class BaseView {
  constructor(name) {
    this.tmpl = window.fest[name];
    this.el = document.createElement('div');
  }

  render(attrs) {
    this.attrs = attrs;
    this.el.innerHTML = this.tmpl(this.attrs);
    return this.el;
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
}