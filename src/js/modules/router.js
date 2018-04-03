import renderDOM from '../components/render/render.js';
import {Sections} from '../config/views.js';

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

  /**
   *
   * @param {String} path
   */
  static back(path) {
    window.history.back();
    //TODO if cur view === game and previous view === login | signUp
    //TODO ---> back to main menu
  }
}