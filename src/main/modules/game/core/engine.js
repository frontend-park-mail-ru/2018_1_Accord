import EventBus from '../../eventBus.js';
import {events} from '../../events.js';
import Logger from '../../../utils/logger.js';

const KEYS = {
  START: [' '],
  FINISH: ['z', 'я'],
  UP: ['ArrowUp', 'w', 'W', 'ц', 'Ц'],
  DOWN: ['ArrowDown', 's', 'S', 'ы', 'Ы'],
};

export default class GameEngine {
  constructor(scene, controller) {
    this.controller = controller;
    this.scene = scene;

    this.gameLoop = this.gameLoop.bind(this);

    this.gameLoopRequestId = null;
    this.controllersLoopIntervalId = null;

    this.onGameStarted = this.onGameStarted.bind(this);
    this.onControllPressed = this.onControllPressed.bind(this);
    this.onGameFinished = this.onGameFinished.bind(this);
    this.onMouseClicked = this.onMouseClicked.bind(this);
    this.onMouseMoved = this.onMouseMoved.bind(this);
    this.onCollision = this.onCollision.bind(this);
  }

  start() {
    this.controller.start();
    this.scene.init();

    EventBus.on(events.GAME.START, this.onGameStarted);
    EventBus.on(events.GAME.FINISH, this.onGameFinished);
    EventBus.on(events.GAME.COLLISION, this.onCollision);
    EventBus.on(events.CONTROL.PRESSED, this.onControllPressed);
    EventBus.on(events.CONTROL.CLICKED, this.onMouseClicked);
    EventBus.on(events.CONTROL.MOUSE_MOVED, this.onMouseMoved);

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
    EventBus.off(events.GAME.COLLISION, this.onCollision);
    EventBus.off(events.CONTROL.PRESSED, this.onControllPressed);
    EventBus.off(events.CONTROL.CLICKED, this.onMouseClicked);
    EventBus.off(events.CONTROL.MOUSE_MOVED, this.onMouseMoved);

    Logger.log('game view: game finished');

    //TODO controller scene ??
  }

  gameLoop() {

  }

  onGameStarted() {

  }

  onMouseClicked() {

  }

  onMouseMoved() {

  }

  onControllPressed() {

  }

  onCollision() {

  }

  onGameFinished() {
    this.controller.destroy();
    this.scene.stop();
    cancelAnimationFrame(this.gameLoopRequestId);
  }

  _pressed(name, data) {
    return KEYS[name].some(k => data[k.toLowerCase()]);
  }

  /**
   * @protected
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
