import userService from '../services/UserService.js';
import {pagePaths} from '../config/pagePaths.js';
import Logger from '../utils/logger.js';
import EventBus from './eventBus.js';
import {events} from './events.js';

export default class Router {

  constructor(root) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.root = root;
    this.map = {};
    this.active = null;

    Router.__instance = this;
  }

  /**
   * Добавляет новый route
   * @param {string} path
   * @param {BaseView} BaseView
   * @return {Router}
   */
  add(path, BaseView) {
    this.map[path] = new BaseView().renderTo(this.root);
    return this;
  }


  /**
   * Осуществляет переход на какой-то route
   * @param {string} path
   * @return {Router}
   */
  open(path) {
    const view = this.map[path];
    // if (!view || view === this.active) {
    //   return this;
    // }

    if (this.active) {
      this.active.destroy();
      this.active = null;
    }

    this.active = view.create();

    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    return this;
  }

  analysePath(path, isLogged) {
    if (isLogged) {
      [pagePaths.SIGN_UP_PATH, pagePaths.LOGIN_PATH,
        pagePaths.PROFILE_PATH].includes(path) ? this.open(pagePaths.START_PATH) : this.open(path);
    }
    else {
      this.open(path);
    }
  }

  validate(path) {
    userService.getUser().then((user) => {
      if (!user) {
        this.analysePath(path, false);
      } else {
        this.analysePath(path, true);
      }
    }).catch((err) => {
      this.analysePath(pagePaths.START_PATH, false);
      Logger.error(err);
    });
  }

  /**
   * Запускает Router
   * @return {Router}
   */
  start() {
    EventBus.on(events.ROUTE.SIGN_UP, () => {
      this.open(pagePaths.START_PATH);
    });

    EventBus.on(events.ROUTE.LOGIN, () => {
      this.open(pagePaths.START_PATH);
    });

    EventBus.on(events.ROUTE.LOGOUT, () => {
      console.log('logout in router');
      this.open(pagePaths.START_PATH);
    });

    EventBus.on(events.ROUTE.GAME, () => {
      this.open(pagePaths.GAME_PATH);
    });

    window.onpopstate = () => {
      this.validate(window.location.pathname);
    };
    this.root.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        event.preventDefault();
        this.open(event.target.getAttribute('href'));
      }
    });
    this.validate(window.location.pathname);
  }
}
