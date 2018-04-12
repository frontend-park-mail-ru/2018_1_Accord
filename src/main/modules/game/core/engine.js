import EventBus from '../../eventBus.js';
import {events} from './events.js';
import Logger from '../../../utils/logger.js';

const KEYS = {
  FIRE: ['Enter'],

  START: [' '],
  FINISH: ['z'],
};

export default class GameEngine {
  constructor(scene, controller) {
    this.controller = controller;
    this.scene = scene;

    this.gameLoop = this.gameLoop.bind(this);

    this.gameLoopRequestId = null;
    this.lastFrame = 0;

    this.controllersLoopIntervalId = null;

    this.state = {
      SCORE: 0,

      DONUT: {
        donutCount: 5,
        donutInFlight: false,
        launchTime: 0,
      },

      MOUSE_POS: {},
    };

    this.onGameStarted = this.onGameStarted.bind(this);
    this.onControllPressed = this.onControllPressed.bind(this);
    this.onGameFinished = this.onGameFinished.bind(this);
    this.onMouseClicked = this.onMouseClicked.bind(this);
    this.onBottomFall = this.onBottomFall.bind(this);
    this.collision = this.collision.bind(this);
  }

  start() {
    this.controller.start();
    this.scene.init();

    EventBus.on(events.GAME.START, this.onGameStarted);
    EventBus.on(events.CONTROL.PRESSED, this.onControllPressed);
    EventBus.on(events.GAME.FINISH, this.onGameFinished);
    EventBus.on(events.CONTROL.CLICKED, this.onMouseClicked);
    EventBus.on(events.GAME.ON_BOTTOM, this.onBottomFall);
    EventBus.on(events.GAME.COLLISION, this.collision);

    Logger.log('Engine: start');

    const controller = this.controller;
    this.controllersLoopIntervalId = setInterval(function () {
      const actions = controller.diff();

      if (Object.keys(actions).some(k => actions[k])) {
        Logger.log(actions, 'PRESSED');
        EventBus.emit(events.CONTROL.PRESSED, actions);
      }
    }, 50);
  }

  destroy() {
    clearInterval(this.controllersLoopIntervalId);

    EventBus.off(events.GAME.START, this.onGameStarted);
    EventBus.off(events.CONTROL.PRESSED, this.onControllPressed);
    EventBus.off(events.GAME.FINISH, this.onGameFinished);
    EventBus.off(events.CONTROL.CLICKED, this.onMouseClicked);
    EventBus.off(events.GAME.ON_BOTTOM, this.onBottomFall);
    EventBus.off(events.GAME.COLLISION, this.collision);

    this.controller.destroy();
    this.scene.stop();
    //TODO
  }

  gameLoop(now) {
    const delay = now - this.lastFrame;
    this.lastFrame = now;

    this.gameLoopRequestId = requestAnimationFrame(this.gameLoop);
  }

  onGameStarted(event) {
    this.lastFrame = performance.now();
    this.scene.startScene();
    this.gameLoopRequestId = requestAnimationFrame(this.gameLoop);
  }

  onMouseClicked(event) {
    if (!this.state.DONUT.donutInFlight) {
      this.state.MOUSE_POS = this._getMousePos(event);
      EventBus.emit(events.GAME.STATE_CHANGED, this.state);
    }
  }

  onControllPressed(event) {
    if (this._pressed('FIRE', event)) {
      this.state.DONUT.launchTime = performance.now();
      this.state.DONUT.donutInFlight = true;
      EventBus.emit(events.GAME.STATE_CHANGED, this.state);

    } else if (this._pressed('START', event)) {
      EventBus.emit(events.GAME.START);

    } else if (this._pressed('FINISH', event)) {
      EventBus.emit(events.GAME.FINISH);
    }
  }

  onGameFinished(event) {
    Logger.log('onGameFinished');
    this.controller.destroy();
    this.scene.stop();
    cancelAnimationFrame(this.gameLoopRequestId);
  }

  collision() {
    this.state.DONUT.launchTime = 0;
    this.state.DONUT.donutInFlight = false;
    ++this.state.SCORE;
    Logger.log('Score: ', this.state.SCORE);

    if (this.state.DONUT.donutCount > 0) {
      --this.state.DONUT.donutCount;
      EventBus.emit(events.GAME.STATE_CHANGED, this.state);
    } else {
      EventBus.emit(events.GAME.STATE_CHANGED, this.state);
      EventBus.emit(events.GAME.FINISH);
    }
  }

  onBottomFall() {
    this.state.DONUT.launchTime = 0;
    this.state.DONUT.donutInFlight = false;

    if (this.state.DONUT.donutCount > 0) {
      --this.state.DONUT.donutCount;
      EventBus.emit(events.GAME.STATE_CHANGED, this.state);
    } else {
      EventBus.emit(events.GAME.STATE_CHANGED, this.state);
      EventBus.emit(events.GAME.FINISH);
    }

  }

  _pressed(name, data) {
    return KEYS[name].some(k => data[k.toLowerCase()]);
  }

  /**
   * @private
   * @param event
   * @returns {{x: number, y: number}}
   */
  _getMousePos(event) {
    const rect = this.scene.ctx.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
}