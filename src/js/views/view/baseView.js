export default class BaseView {
  constructor(name) {
    this.tmpl = window.fest[name];
    this.attrs = {};
  }

  render(attrs) {
    this.attrs = attrs || this.attrs;
    this.el = document.createElement('div');
    this.el.innerHTML = this.tmpl(this.attrs);
    return this.el;
  }
}