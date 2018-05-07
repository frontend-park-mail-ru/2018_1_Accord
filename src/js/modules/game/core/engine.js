import EventBus from '../../eventBus.js';
import {events} from '../../events.js';
import Logger from '../../../utils/logger.js';
import {gameObjects} from '../graphics/gameObjects.js';

const KEYS = {
  START: [' '],
  FINISH: ['z'],
  LEFT: ['ArrowLeft', 'a', 'A', 'ф', 'Ф'],
  RIGHT: ['ArrowRight', 'd', 'D', 'в', 'В'],
};

export default class GameEngine {
  constructor(scene, controller) {
    this.controller = controller;
    this.scene = scene;

    this.gameLoop = this.gameLoop.bind(this);

    this.gameLoopRequestId = null;
    this.lastFrame = 0;

    this.controllersLoopIntervalId = null;

    this.gameStarted = false;

    this.state = {
      SCORE: 0,

      DONUT: {
        donutCount: gameObjects.DONUT.count,
        donutInFlight: false,
        launchTime: 0,
        vX: gameObjects.DONUT.vX,
      },

      MOUSE_POS: {},
    };

    this.onGameStarted = this.onGameStarted.bind(this);
    this.onControllPressed = this.onControllPressed.bind(this);
    this.onGameFinished = this.onGameFinished.bind(this);
    this.onMouseClicked = this.onMouseClicked.bind(this);
    this.onMouseMoved = this.onMouseMoved.bind(this);
    this.onBottomFall = this.onBottomFall.bind(this);
    this.collision = this.collision.bind(this);
  }

  start() {
    this.controller.start();
    this.scene.init();

    EventBus.on(events.GAME.START, this.onGameStarted);
    EventBus.on(events.GAME.FINISH, this.onGameFinished);

    EventBus.on(events.CONTROL.PRESSED, this.onControllPressed);
    EventBus.on(events.CONTROL.CLICKED, this.onMouseClicked);
    EventBus.on(events.CONTROL.MOUSE_MOVED, this.onMouseMoved);

    EventBus.on(events.GAME.ON_BOTTOM, this.onBottomFall);
    EventBus.on(events.GAME.COLLISION, this.collision);

    const controller = this.controller;
    this.controllersLoopIntervalId = setInterval(function () {
      const actions = controller.diff();

      if (Object.keys(actions).some(k => actions[k])) {
        EventBus.emit(events.CONTROL.PRESSED, actions);
      }
    }, 50);
  }

  destroy() {
    clearInterval(this.controllersLoopIntervalId);

    EventBus.off(events.GAME.START, this.onGameStarted);
    EventBus.off(events.GAME.FINISH, this.onGameFinished);

    EventBus.off(events.CONTROL.PRESSED, this.onControllPressed);
    EventBus.off(events.CONTROL.CLICKED, this.onMouseClicked);
    EventBus.off(events.CONTROL.MOUSE_MOVED, this.onMouseMoved);

    EventBus.off(events.GAME.ON_BOTTOM, this.onBottomFall);
    EventBus.off(events.GAME.COLLISION, this.collision);

    this.controller.destroy();
    //TODO
  }

  gameLoop(now) {
    const delay = now - this.lastFrame;
    Logger.log(delay);
    this.lastFrame = now;

    this.gameLoopRequestId = requestAnimationFrame(this.gameLoop);
  }

  onGameStarted() {
    this.lastFrame = performance.now();
    this.scene.startScene();
    this.gameLoopRequestId = requestAnimationFrame(this.gameLoop);
  }

  onMouseClicked(event) {
    if (!this.state.DONUT.donutInFlight && this.state.DONUT.donutCount > 0 && this.gameStarted) {
      --this.state.DONUT.donutCount;
      this.state.DONUT.launchTime = performance.now();
      this.state.DONUT.donutInFlight = true;
      this.state.MOUSE_POS = this._getMousePos(event);
      EventBus.emit(events.GAME.STATE_CHANGED, this.state);
    }
  }

  onMouseMoved(event) {
    if (!this.state.DONUT.donutInFlight && this.gameStarted) {
      this.state.MOUSE_POS = this._getMousePos(event);
      EventBus.emit(events.GAME.STATE_CHANGED, this.state);
    }
  }

  onControllPressed(event) {
    if (this._pressed('START', event) && !this.gameStarted) {
      this.gameStarted = true;
      EventBus.emit(events.GAME.START);

    } else if (this._pressed('FINISH', event)) {
      this.gameStarted = false;
      EventBus.emit(events.GAME.FINISH);

    } else if (this._pressed('LEFT', event) && this.gameStarted) {
      EventBus.emit(events.GAME.POSITION_CHANGED, 'LEFT');

    } else if (this._pressed('RIGHT', event) && this.gameStarted) {
      EventBus.emit(events.GAME.POSITION_CHANGED, 'RIGHT');
    }
  }

  onGameFinished() {
    this.controller.destroy();
    cancelAnimationFrame(this.gameLoopRequestId);
  }

  collision() {
    this.state.DONUT.launchTime = 0;
    this.state.DONUT.donutInFlight = false;
    ++this.state.SCORE;

    EventBus.emit(events.GAME.STATE_CHANGED, this.state);

    if (this.state.DONUT.donutCount === 0) {
      EventBus.emit(events.GAME.FINISH);
    }
  }

  onBottomFall() {
    this.state.DONUT.launchTime = 0;
    this.state.DONUT.donutInFlight = false;

    EventBus.emit(events.GAME.STATE_CHANGED, this.state);

    if (this.state.DONUT.donutCount === 0) {
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