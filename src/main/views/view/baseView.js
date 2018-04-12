'use strict';


import EventBus from '../../modules/eventBus.js';
import Logger from '../../utils/logger.js';

export default class BaseView {
  constructor(name) {
    this.tmpl = window.fest[name];
    this.el = document.createElement('div');
    this.bus = EventBus;
    this.hide();
  }

  async render(attrs) {
    this.el.innerHTML = this.tmpl(attrs);
    return this;
  }

  hide() {
    this.el.setAttribute('hidden', 'hidden');
    this.active = false;
    return this;
  }

  show() {
    this.el.removeAttribute('hidden');
    this.active = true;
    return this;
  }

  create() {
    this.render()
      .then((viewElem) => {
        Logger.log(viewElem);
      });

    return this.show();
  }

  destroy() {
    this.hide();
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