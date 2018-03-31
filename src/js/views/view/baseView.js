export default class BaseView {
  constructor(name) {
    this.tmpl = window.fest[name];
  }

  render(attrs) {
    this.attrs = attrs;
    this.el = document.createElement('div');
    this.el.innerHTML = this.tmpl(this.attrs);
    return this.el;
  }
}