import {selector} from '../../../config/selector.js';
import EventBus from '../../../modules/eventBus.js';
import {events} from '../../../modules/events.js';

export default class StartGameView {
  /**
   *
   * @param {HTMLElement} element
   * @param {User | undefined} userData
   */
  constructor(element, userData) {
    this.startGame = element.querySelector(selector.START_GAME);
    this.userData = userData;

    this.select = this.startGame.querySelector(selector.SELECT);
    this.singleButton = this.startGame.querySelector(selector.SINGLE_BUTTON);
    this.battleButton = this.startGame.querySelector(selector.BATTLE_BUTTON);

    this.select.addEventListener('change', (event) => {
      event.preventDefault();
      if (event.target.value) {
        EventBus.emit(events.START_GAME.LEVEL_SELECTED, event.target.value);
      }
    });

    this.singleButton.addEventListener('click', (event) => {
      event.preventDefault();
      EventBus.emit(events.START_GAME.SINGLE_CLICKED);
    });

    this.battleButton.addEventListener('click', (event) => {
      event.preventDefault();
      EventBus.emit(events.START_GAME.BATTLE_CLICKED);
    });

    if (!this.userData) {
      this.battleButton.style.display = 'none';
    }

    return this.startGame;
  }
}
