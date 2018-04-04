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
   * @param {View} View
   * @return {Router}
   */
  add(path, View) {
    this.map[path] = new View().renderTo(this.root);
    return this;
  }


  /**
   * Осуществляет переход на какой-то route
   * @param {string} path
   * @return {Router}
   */
  open(path) {
    const view = this.map[path];
    if(!view || view === this.active) {
      return this;
    }

    if(this.active) {
      this.active.destroy();
      this.active = null;
    }

    this.active = view.create();

    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    return this;
  }


  /**
   * Запускает Router
   * @return {Router}
   */
  start() {
    window.onpopstate = () => {
      //TODO: проверку можно ли перейти
      this.open(window.location.pathname);
    }
    this.root.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        event.preventDefault();
        this.open(event.target.getAttribute('href'));
      }
    })

    this.open(window.location.pathname);
  }
}