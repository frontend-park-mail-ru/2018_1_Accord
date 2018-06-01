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
import EndGameView from '../../../components/blocks/endGame/EndGameView.js';


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

    this._onGameFinish = this._onGameFinish.bind(this);
    this._onLevelSelected = this._onLevelSelected.bind(this);
    this._onSingleClicked = this._onSingleClicked.bind(this);
    this._onBattleClicked = this._onBattleClicked.bind(this);
    this.handleStart = this.handleStart.bind(this);

    this.bus.on(events.GAME.FINISH, this._onGameFinish);
  }

  destroy() {
    if (this.gameProc) {
      this.gameProc.destroy();
      this.gameProc = null;
    }
    this.bus.off(events.GAME.FINISH, this._onGameFinish);
    this.bus.off(events.START_GAME.LEVEL_SELECTED, this._onLevelSelected);
    this.bus.off(events.START_GAME.SINGLE_CLICKED, this._onSingleClicked);
    this.bus.off(events.START_GAME.BATTLE_CLICKED, this._onBattleClicked);

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

    this.bus.on(events.START_GAME.LEVEL_SELECTED, this._onLevelSelected);
    this.bus.on(events.START_GAME.SINGLE_CLICKED, this._onSingleClicked);
    this.bus.on(events.START_GAME.BATTLE_CLICKED, this._onBattleClicked);
  }

  _getElements() {
    this.game = this.el.querySelector(selector.GAME_VIEW);
    this.unAuthInfo = this.game.querySelector(selector.GAME_UNAUTH_INFO);
    this.errorField = this.game.querySelector(selector.GAME_ERROR);
    this.canvas = this.el.querySelector(selector.CANVAS);
    this.endGame = this.game.querySelector(selector.END_GAME);

    this.unAuthInfo.style.display = 'none';
    this.errorField.style.display = 'none';
    this.canvas.style.display = 'none';
    this.endGame.style.display = 'none';

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

  _onGameFinish(result) {
    console.log('finish', result);
    if (this.active) {
      this.gameProc.destroy();
      this.endGame = new EndGameView(this.game, result);
    }
  }

  handleStart() {
    this.gameProc = new Game(this.canvas, this.gameSettings);
    this.startMenu.style.display = 'none';
    this.unAuthInfo.style.display = 'none';
    this.errorField.style.display = 'none';
    this.canvas.style.display = 'block';
    this.gameProc.start();
  }

  _onLevelSelected(value) {
    this.gameSettings.level = value;
    Logger.log('level: ', value);
  }

  _onSingleClicked() {
    this.gameSettings.player = gameSettings.player.SINGLE_PLAYER;
    this.handleStart();
  }

  _onBattleClicked() {
    this.gameSettings.player = gameSettings.player.BATTLE;
    this.handleStart();
  }
}
