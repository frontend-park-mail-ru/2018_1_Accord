import renderDOM from '../components/render/render.js';
import {Sections} from '../config/views.js';
import Logger from '../utils/logger.js';

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
            Logger.log('Elem from Promise: ', elem);
            element = elem;
            renderDOM(element, document.getElementById('root'));
          });
      } catch (_) {
        element = Sections[newSection].render();
        Logger.log('catch: ', element);
        renderDOM(element, document.getElementById('root'));
      }

    }

  }
}