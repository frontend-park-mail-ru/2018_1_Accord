import {Sections} from '../application.js';
import renderDOM from '../components/render/render.js';

export default class Router {

  constructor() {
  }

  /**
     * @param {String} newSection
     */
  static changeSection(newSection) {
    if (Sections[newSection]) {
      renderDOM(Sections[newSection].render(), document.getElementById('root'));
    }

  }
}