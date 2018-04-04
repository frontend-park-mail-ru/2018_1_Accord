import renderDOM from '../components/render/render.js';
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
      renderDOM(Sections[newSection].render(), document.getElementById('root'));
    }

  }
}