import renderDOM from './render/render.js';
import {Sections} from '../config/views.js';

export default class Router {

  constructor(root) {
    this.root = root;
  }

  /**
   * @param {String} newSection
   */
  static changeSection(newSection) {
    if (Sections[newSection]) {

      let element;

      try {
        Sections[newSection].render()
          .then((elem) => {
            element = elem;
            renderDOM(element, document.getElementById('root'));
          });
      } catch (_) {
        element = Sections[newSection].render();
        renderDOM(element, document.getElementById('root'));
      }

    }

  }
}