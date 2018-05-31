import GameEngine from './engine.js';
import WebSocketService from '../../../services/WebSocketService.js';
import EventBus from '../../eventBus.js';
import {events} from '../../events.js';
import {enemyState, state} from '../graphics/gameObjects.js';

export default class MultiPlayer extends GameEngine {
  constructor(scene, controller) {
    super(scene, controller);
    this.receiveMessage = this.receiveMessage.bind(this);

    EventBus.on(events.WS.MESSAGE, this.receiveMessage);
    EventBus.on(events.WS.START_GAME, () => {
      this.isPlaying = true;
    });
    this.state = state;
    // console.log
    this.enemyState = enemyState;
    this.isPlaying = false;
  }

  start() {
    super.start();
  }

  destroy() {
    super.destroy();
    EventBus.off(events.WS.MESSAGE, this.receiveMessage);
    this.ws.close();
  }

  onGameStarted() {
    this.scene.startScene();
    this.ws = new WebSocketService();
  }

  onMouseClicked() {
    if (this.state.isPlaying && !this.state.inFlight && this.gameStarted) {
      this.state.mousePos = this._getMousePos(event);
      this.state.inFlight = true;
      this.state.flightState.hit = this.state.flightState.missed = false;
      this.state.lives--;
      EventBus.emit(events.GAME.STATE_CHANGED, this.state);

      this.ws.sendMsg({
        'velocity': this.state.velocity,
        'angle': this.state.angle,
        'positionX': this.state.positionX,
        'positionY': this.state.positionY,
      });
    }
  }

  onMouseMoved() {

  }

  onControllPressed(event) {
    if (this._pressed('START', event) && !this.gameStarted) {
      this.gameStarted = true;
      EventBus.emit(events.GAME.START);
      console.log('start clicked');

    } else if (this._pressed('FINISH', event)) {
      this.gameStarted = false;
      EventBus.emit(events.GAME.FINISH);

    } else if (this._pressed('UP', event) && this.gameStarted) {
      EventBus.emit(events.GAME.POSITION_CHANGED, 'UP');

    } else if (this._pressed('DOWN', event) && this.gameStarted) {
      EventBus.emit(events.GAME.POSITION_CHANGED, 'DOWN');
    }
  }

  receiveMessage(msg) {
    console.log('received msg:', msg);
  }
}
