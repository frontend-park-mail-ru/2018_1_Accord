 import EventBus from '../eventBus.js';
import {events} from '../events.js';

export default class GameControllers {
  constructor() {
    this.root = document.getElementById('root');
    this.previous = {};
    this.keys = {};

    this._onPress = this._keyHandler.bind(this, 'press');
    this._onUp = this._keyHandler.bind(this, 'up');
    this._onClicked = this._mouseClicked.bind(this);
    this._onMoved = this._mouseMoved.bind(this);
  }

  /**
   * Начинаем слушать события клавиатуры
   */
  start() {
    document.addEventListener('keydown', this._onPress);
    document.addEventListener('keyup', this._onUp);
    document.addEventListener('click', this._onClicked);
    document.addEventListener('mousemove', this._onMoved);
  }

  /**
   * Прекращаем слушать события клавиатуры
   */
  destroy() {
    document.removeEventListener('keydown', this._onPress);
    document.removeEventListener('keyup', this._onUp);
    document.removeEventListener('click', this._onClicked);
    document.removeEventListener('mousemove', this._onMoved);
  }

  /**
   * Нажата ли клавиша?
   * @param  {string}  key
   * @return {boolean}
   */
  is(key) {
    return this.keys[key];
  }

  _mouseClicked(event) {
    if (event.target.tagName === 'CANVAS') {
      EventBus.emit(events.CONTROL.CLICKED, event);
    }
  }

  _mouseMoved(event) {
    if (event.target.tagName === 'CANVAS') {
      EventBus.emit(events.CONTROL.MOUSE_MOVED, event);
    }
  }

  /**
   * Обработчик события
   * @param  {string} type
   * @param  {MouseEvent} event
   */
  _keyHandler(type, event) {
    this.keys[event.key.toLowerCase()] = type === 'press';
  }

  /**
   * Получить клавиши, нажатые с момента прошлого запроса
   * @returns {*}1
   */
  diff() {
    let allkeys = [];
    allkeys.push.apply(allkeys, Object.keys(this.previous));
    allkeys.push.apply(allkeys, Object.keys(this.keys));
    allkeys = allkeys.map(k => k.toLowerCase());
    allkeys = allkeys.filter((key, pos, all) => {
      return all.indexOf(key, pos + 1) === -1;
    });

    const clicked = allkeys.reduce((res, key) => {
      res[key] = !this.previous[key] && this.keys[key];
      return res;
    }, {});

    this.previous = Object.assign({}, this.keys);
    return clicked;
  }

}
