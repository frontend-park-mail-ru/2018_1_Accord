import GameEngine from './engine.js';
import WebSocketService from '../../../services/WebSocketService.js';
import EventBus from '../../eventBus.js';
import {events} from '../../events.js';
import {enemyState, state} from '../graphics/gameObjects.js';

export default class MultiPlayer extends GameEngine {
  constructor(scene, controller) {
    super(scene, controller);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.foundEnemyHandler = this.foundEnemyHandler.bind(this);

    EventBus.on(events.WS.MESSAGE, this.receiveMessage);
    EventBus.on(events.WS.START_GAME, this.foundEnemyHandler);

    this.state = state;
    this.enemyState = enemyState;
    this.isPlaying = false;
  }

  start() {
    super.start();
  }

  destroy() {
    super.destroy();
    EventBus.off(events.WS.MESSAGE, this.receiveMessage);
    EventBus.off(events.WS.START_GAME, this.foundEnemyHandler);
    if (this.ws) {
      this.ws.close();
    }
  }

  onGameStarted() {
    this.ws = new WebSocketService();
  }

  foundEnemyHandler() {
    this.isPlaying = true;
    this.scene.startScene();
  }

  onMouseClicked() {
    if (this.state.isPlaying && !this.state.inFlight && this.gameStarted) {
      this.state.mousePos = this._getMousePos(event);
      this.state.inFlight = true;
      this.state.flightState.hit = this.state.flightState.missed = false;
      this.state.lives--;
      EventBus.emit(events.GAME.ENGINE_STATE_CHANGED, this.state);

      this.ws.sendMsg({
        'action': 'fire',
        'data': {
          'velocity': this.state.velocity,
          'angle': this.state.angle,
          'positionY': this.state.positionY,
        }
      });
    }
  }

  onMouseMoved() {

  }

  onStateChanged() {

  }

  onControllPressed(event) {
    if (this._pressed('START', event) && !this.gameStarted) {
      this.gameStarted = true;
      EventBus.emit(events.GAME.START);
      console.log('start clicked');

    } else if (this._pressed('FINISH', event)) {
      this.gameStarted = false;
      EventBus.emit(events.GAME.FINISH);

    } else if (this._pressed('UP', event) && this.gameStarted && !this.state.inFlight) {
      EventBus.emit(events.GAME.POSITION_CHANGED, 'UP');

    } else if (this._pressed('DOWN', event) && this.gameStarted && !this.state.inFlight) {
      EventBus.emit(events.GAME.POSITION_CHANGED, 'DOWN');
    }
  }

  receiveMessage(msg) {
    switch (msg.action) {
      case 'fire':
        this.enemyState.angle = msg.data.angle;
        this.enemyState.velocity = msg.data.velocity;
        this.enemyState.positionY = msg.data.positionY;
        this.enemyState.inFlight = true;
        this.enemyState.flightState.hit = this.enemyState.flightState.missed = false;

        EventBus.emit(events.GAME.ENEMY_STATE_CHANGED, this.enemyState);
        break;

      case 'gameStart':
        this.foundEnemyHandler();
        break;

      case 'serverResult':
        console.log('server result', msg);
        break;

      case 'endGame':
        console.log('endGame', msg);
        EventBus.emit(events.GAME.FINISH);
        break;

      case 'debug':
        console.log('DEBUG', msg);
        break;
    }
  }
}
