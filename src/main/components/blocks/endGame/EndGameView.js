import BaseView from '../../../views/view/baseView.js';
import {selector} from '../../../config/selector.js';
import EventBus from '../../../modules/eventBus.js';
import {events} from '../../../modules/events.js';

export default class EndGameView extends BaseView {
  constructor(element, result) {
    super('main/views/pages/GameView/EndGameView.tmpl');
    this.endGame = element.querySelector(selector.END_GAME);
    this.endGame.style.display = 'block';

    this.tryAgain = this.endGame.querySelector(selector.TRY_AGAIN);
    this.tryAgain.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('try again', EventBus.listeners);
      EventBus.emit(events.ROUTE.GAME);
    });

    this.userText = this.endGame.querySelector(selector.USER_TEXT);
    this.userText.innerText += `  ${result.you}`;

    this.enemyText = this.endGame.querySelector(selector.ENEMY_TEXT);
    if (result.enemy === undefined) {
      this.enemyText.style.display = 'none';
    } else {
      this.enemyText.innerText += `  ${result.enemy}`;
    }

    this.resultString = this.endGame.querySelector(selector.RESULT_TEXT);
    this.resultString.innerHTML = result.resultString;

    return this.endGame;
  }
}
