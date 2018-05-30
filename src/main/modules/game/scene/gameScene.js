import EventBus from '../../eventBus.js';
import Donut from './Donut.js';
import Homer from './Homer.js';
import {gameObjects} from '../graphics/gameObjects.js';
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

    if (withEnemy) {
      this.donutRight = new Donut(this.ctx, 'RIGHT');
      this.enemyState = {};
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
    this.homer.draw();
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
  }

  donutMove(direction) {
    if (direction === 'DOWN' && this.donutLeft.y + this.donutLeft.dYMove < this.ctx.canvas.height - 20) {
      this.donutLeft.y += this.donutLeft.dYMove;
    }

    if (direction === 'UP' && this.donutLeft.y - this.donutLeft.dYMove > 10) {
      this.donutLeft.y -= this.donutLeft.dYMove;
    }
  }

  donutFly(delay) {
    const flightState = this.donutLeft.fly(delay, {x: this.homer.x, y: this.homer.y});
  }

  onStateChanged(state) {
    this.state = state;
    this.donutLeft.countAngle(this.state.mousePos);
    this.donutLeft.countVelocity(this.state.mousePos);
  }

  set enemyState(state) {
    this.enemyState = state;
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
