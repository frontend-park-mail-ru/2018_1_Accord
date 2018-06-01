'use strict';

import EventBus from '../../modules/eventBus.js';
import {selector} from '../../config/selector.js';
import audio from '../../modules/AudioPlayer/AudioPlayer.js';

export default class BaseView {
  constructor(name) {
    this.tmpl = window.fest[name];
    this.el = document.createElement('div');
    this.bus = EventBus;

    this.loader = document.querySelector(selector.LOADER);

    this.hide();
  }

  render(attrs) {
    audio.play();
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
    return this.render().show();
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
