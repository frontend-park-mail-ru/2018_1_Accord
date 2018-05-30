import GameEngine from './engine.js';
import EventBus from '../../eventBus.js';
import {events} from '../../events.js';

export default class SinglePlayer extends GameEngine {
  constructor(scene, controller) {
    super(scene, controller);

    this.gameStarted = false;

    this.state = {
      isPlaying: true,
      inFlight: false,
      win: false,
      angle: 0,
      velocity: 0,
      lives: 100,
      score: 0,
      mousePos: {x: 0, y: 0},
      flightState: {missed: false, hit: false},
    };
  }

  start() {
    super.start();
  }

  destroy() {
    super.destroy();
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

  onGameStarted() {
    this.scene.startScene();
  }

  onMouseClicked(event) {
    if (this.state.isPlaying && !this.state.inFlight) {
      this.state.mousePos = this._getMousePos(event);
      this.state.inFlight = true;
      this.state.flightState.hit = this.state.flightState.missed = false;
      this.state.lives--;
      EventBus.emit(events.GAME.STATE_CHANGED, this.state);
    }
  }
}
