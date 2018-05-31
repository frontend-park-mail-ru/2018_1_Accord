import EventBus from '../../eventBus.js';
import Donut from './Donut.js';
import Homer from './Homer.js';
import {gameObjects, state, enemyState} from '../graphics/gameObjects.js';
import {events} from '../../events.js';
import StartText from '../graphics/startText.js';
import ScoreBoard from '../graphics/scoreBoard.js';
import CanvasLives from '../graphics/lives.js';

export default class GameScene {
  constructor(canvas, withEnemy) {
    this.bus = EventBus;
    this.ctx = canvas.getContext('2d');
    this.requestFrameId = null;
    this.lastFrameTime = 0;

    this.donutLeft = new Donut(this.ctx, 'LEFT');
    this.homer = new Homer(this.ctx, gameObjects.HOMER.x, gameObjects.HOMER.y);

    this.startText = new StartText(this.ctx, gameObjects.TEXT.startText,
      gameObjects.TEXT.centerX, gameObjects.TEXT.centerY);
    this.scoreboard = new ScoreBoard(this.ctx, 1);
    this.lives = new CanvasLives(this.ctx, 50);

    this.state = state;

    if (withEnemy) {
      this.donutRight = new Donut(this.ctx, 'RIGHT');
      this.enemyState = enemyState;
    }

    this.renderScene = this.renderScene.bind(this);
    this.onStateChanged = this.onStateChanged.bind(this);
    this.stop = this.stop.bind(this);
    this.donutMove = this.donutMove.bind(this);
    this.donutFly = this.donutFly.bind(this);
  }

  init() {
    EventBus.on(events.GAME.STATE_CHANGED, this.onStateChanged);
    EventBus.on(events.GAME.FINISH, this.stop);
    EventBus.on(events.GAME.POSITION_CHANGED, this.donutMove);

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.startText.draw();
  }

  renderScene(now) {
    const delay = now - this.lastFrameTime;
    this.lastFrameTime = now;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.homer.move(delay);

    if (this.state.inFlight) {
      this.donutFly(delay);
    }

    this.scoreboard.setScore({player_1: this.state.score});
    this.lives.setValue(`${this.state.lives}`);

    this.renderAll();

    this.requestFrameId = requestAnimationFrame(this.renderScene);
  }

  startScene() {
    this.lastFrameTime = performance.now();
    this.requestFrameId = requestAnimationFrame(this.renderScene);
  }

  stop() {
    if (this.requestFrameId) {
      window.cancelAnimationFrame(this.requestFrameId);
      this.requestFrameId = null;
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    EventBus.off(events.GAME.STATE_CHANGED, this.onStateChanged);
    EventBus.off(events.GAME.POSITION_CHANGED, this.donutMove);
    EventBus.off(events.GAME.FINISH, this.stop);

    this.donutLeft = this.donutRight = null;
    this.homer = null;
    this.state = this.enemyState = null;
    this.ctx = null;
  }

  donutMove(direction) {
    if (direction === 'DOWN' && this.donutLeft.y + this.donutLeft.dYMove < this.ctx.canvas.height - 20) {
      this.donutLeft.y += this.donutLeft.dYMove;
    }

    if (direction === 'UP' && this.donutLeft.y - this.donutLeft.dYMove > 10) {
      this.donutLeft.y -= this.donutLeft.dYMove;
    }

    const min = Math.min(this.ctx.canvas.width, this.ctx.canvas.height);
    this.state.positionX = this.donutLeft.x * min / 100;
    this.state.positionY = this.donutLeft.y * min / 100;
    EventBus.emit(events.GAME.STATE_CHANGED, this.state);
  }

  donutFly(delay) {
    const flightState = this.donutLeft.fly(delay, {x: this.homer.x, y: this.homer.y});

    if (flightState.hit) {
      this.state.score++;
      this.state.inFlight = false;
      this.state.flightState = flightState;
      this.scoreboard.setScore({player_1: `${this.state.score}`});
      EventBus.emit(events.GAME.COLLISION, this.state);
      return;
    }

    if (flightState.missed) {
      this.state.inFlight = false;
      this.state.flightState = flightState;
      EventBus.emit(events.GAME.COLLISION, this.state);
    }
  }

  onStateChanged(state) {
    this.state = state;
    this.donutLeft.countAngle(this.state.mousePos);
    this.donutLeft.countVelocity(this.state.mousePos);
  }

  renderAll() {
    this.homer.render();
    this.donutLeft.render();
    this.scoreboard.render();
    this.lives.render();

    if (this.donutRight) {
      this.donutRight.render();
    }
  }

}
