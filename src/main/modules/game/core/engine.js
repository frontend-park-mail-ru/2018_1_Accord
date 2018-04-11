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

    this.onGameStarted = this.onGameStarted.bind(this);
    this.onControllPressed = this.onControllPressed.bind(this);
    this.onGameFinished = this.onGameFinished.bind(this);
  }

  start() {
    this.controller.start();
    this.scene.init();

    EventBus.on(events.GAME.START, this.onGameStarted);
    EventBus.on(events.CONTROL.PRESSED, this.onControllPressed);
    EventBus.on(events.GAME.FINISH, this.onGameFinished);

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

  onControllPressed(event) {
    if (this._pressed('FIRE', event)) {
      Logger.log('V ATAKUUUUU');

    } else if (this._pressed('START', event)) {
      EventBus.emit(events.GAME.START);

    } else if (this._pressed('FINISH', event)) {
      EventBus.emit(events.GAME.FINISH);
    }
  }

  onGameFinished(event) {
    Logger.log('onGameFinished');
    cancelAnimationFrame(this.gameLoopRequestId);

    EventBus.emit(events.GAME.FINISH);
  }

  _pressed(name, data) {
    return KEYS[name].some(k => data[k.toLowerCase()]);
  }
}