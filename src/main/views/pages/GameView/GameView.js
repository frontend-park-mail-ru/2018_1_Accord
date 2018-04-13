import userService from '../../../services/UserService.js';
import Logger from '../../../utils/logger.js';
import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import NavBar from '../../../components/blocks/navBar/navBar.js';
import Game from '../../../modules/game/game.js';
import {info} from '../../../config/textInfo.js';
import {fetchFaildErrors} from '../../../config/textErrors.js';
import {events} from '../../../modules/game/core/events.js';
import {gameObjects} from '../../../modules/game/graphics/gameObjects.js';


export default class GameView extends BaseView {
  constructor() {
    super('main/views/pages/GameView/GameView.tmpl');

    this.navBar = [selector.MUTE_BUTTON,
      selector.BACK_BUTTON,
      selector.SETTINGS_BUTTON];

    this.bus.on(events.GAME.FINISH, function () {
      if (this.active) {
        //window.history.back();
        this.gameProc.destroy();
      }
    }.bind(this));
  }

  async render() {
    super.render();

    this.game = this.el.querySelector(selector.GAME_VIEW);
    this.unAuthInfo = this.game.querySelector(selector.GAME_UNAUTH_INFO);
    this.unAuthInfo.style.display = 'none';

    this.errorField = this.game.querySelector(selector.GAME_ERROR);
    this.errorField.style.display = 'none';

    try {
      this.user = await userService.getUser();

      if (!this.user) {
        this.unAuthInfo.style.display = 'block';
        this.unAuthInfo.innerText = info.gameUnAuthInfo;

      } else {
        this.navBar = [
          selector.MUTE_BUTTON,
          selector.BACK_BUTTON,
          selector.SETTINGS_BUTTON,
          selector.PROFILE_BUTTON
        ];

        this.unAuthInfo.style.display = 'none';
      }

    } catch (err) {
      this.navBar = [
        selector.MUTE_BUTTON,
        selector.BACK_BUTTON,
        selector.SETTINGS_BUTTON,
      ];
      this.errorField.innerText = fetchFaildErrors.noConnection;
      this.errorField.style.display = 'block';
      Logger.error(err);
    }

    new NavBar(this.el, this.navBar, this.user);

    const canvas = this.el.querySelector(selector.CANVAS);
    canvas.height = gameObjects.CANVAS.height;
    canvas.width = gameObjects.CANVAS.width;
    this.gameProc = new Game(canvas);
    this.gameProc.start();

    return this;
  }
}
