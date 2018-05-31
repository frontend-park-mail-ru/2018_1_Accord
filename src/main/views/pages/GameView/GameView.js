import userService from '../../../services/UserService.js';
import Logger from '../../../utils/logger.js';
import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import NavBar from '../../../components/blocks/navBar/navBar.js';
import Game from '../../../modules/game/game.js';
import {info} from '../../../config/textInfo.js';
import {fetchFaildErrors} from '../../../config/textErrors.js';
import {gameSettings} from '../../../config/gameSettings.js';
import {events} from '../../../modules/events.js';
import {gameObjects} from '../../../modules/game/graphics/gameObjects.js';
import StartGameView from '../../../components/blocks/startGame/StartGame.js';


export default class GameView extends BaseView {
  constructor() {
    super('main/views/pages/GameView/GameView.tmpl');

    this.navBar = [selector.MUTE_BUTTON,
      selector.BACK_BUTTON,
      selector.SETTINGS_BUTTON];

    this.gameSettings = {
      mode: '',
      player: '',
      user: null,
      level: gameSettings.level.EASY
    };

    this.bus.on(events.GAME.FINISH, function () {
      if (this.active) {
        this.gameProc.destroy();
      }
    }.bind(this));
  }

  destroy() {
    if (this.gameProc) {
      this.gameProc.destroy();
      this.gameProc = null;
    }
    super.destroy();
  }

  render() {
    super.render();

    this.loader.style.display = 'none';

    this._getElements();

    userService.getUser()
      .then((user) => {
        this._resolveUser(user);
        new NavBar(this.el, this.navBar, this.user);
        this._showStartMenu();
      })
      .catch((error) => {
        this._rejectUser(error);
        new NavBar(this.el, this.navBar, this.user);
        this._showStartMenu();
      });

    return this;
  }

  _showStartMenu() {
    this.startMenu = new StartGameView(this.game, this.user);

    const handleStart = () => {
      this.gameProc = new Game(this.canvas, this.gameSettings);
      this.startMenu.style.display = 'none';
      this.unAuthInfo.style.display = 'none';
      this.errorField.style.display = 'none';
      this.canvas.style.display = 'block';
      this.gameProc.start();
    };
    this.bus.on(events.START_GAME.LEVEL_SELECTED, (value) => {
      this.gameSettings.level = value;
      Logger.log('level: ', value);
    });

    this.bus.on(events.START_GAME.SINGLE_CLICKED, () => {
      this.gameSettings.player = gameSettings.player.SINGLE_PLAYER;
      Logger.log('game settings: ', this.gameSettings);

      this.startMenu.style.display = 'none';
      const imgHomer = this.el.querySelector('.start_game__image');
      imgHomer.style.display = 'none';

      this.canvas.style.display = 'block';
      this.canvas.height = gameObjects.CANVAS.height;
      this.canvas.width = gameObjects.CANVAS.width;
      this.gameProc = new Game(this.canvas);
      this.gameProc.start();
    });

    this.bus.on(events.START_GAME.BATTLE_CLICKED, () => {
      this.gameSettings.player = gameSettings.player.BATTLE;
      handleStart();
    });
  }

  _getElements() {
    this.game = this.el.querySelector(selector.GAME_VIEW);
    this.unAuthInfo = this.game.querySelector(selector.GAME_UNAUTH_INFO);
    this.errorField = this.game.querySelector(selector.GAME_ERROR);
    this.canvas = this.el.querySelector(selector.CANVAS);

    this.unAuthInfo.style.display = 'none';
    this.errorField.style.display = 'none';
    this.canvas.style.display = 'none';

    this.canvas.height = gameObjects.CANVAS.height;
    this.canvas.width = gameObjects.CANVAS.width;

    this.game.parentElement.style.height = '100%';
  }

  _resolveUser(user) {
    this.user = user;
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

    this.gameSettings.mode = gameSettings.mode.ONLINE;
    this.gameSettings.user = this.user;
  }

  _rejectUser(error) {
    this.navBar = [
      selector.MUTE_BUTTON,
      selector.BACK_BUTTON,
      selector.SETTINGS_BUTTON,
    ];
    this.errorField.innerText = fetchFaildErrors.noConnection;
    this.errorField.style.display = 'block';

    this.gameSettings.mode = gameSettings.mode.OFFLINE;

    Logger.error(error);
  }
}
