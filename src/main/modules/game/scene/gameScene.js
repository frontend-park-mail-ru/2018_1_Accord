import EventBus from '../../eventBus.js';
import Donut from './Donut.js';
import Homer from './Homer.js';
import {gameObjects} from '../graphics/gameObjects.js';
import {events} from '../core/events.js';
import CanvasText from '../graphics/text.js';
import Circle from '../graphics/circle.js';
import StartText from '../graphics/startText.js';

export default class GameScene {
  constructor(canvas) {
    this.bus = EventBus;
    this.ctx = canvas.getContext('2d');

    this.requestFrameId = null;
    this.lastFrameTime = 0;

    this.startText = new StartText(this.ctx, gameObjects.TEXT.startText,
      gameObjects.TEXT.centerX, gameObjects.TEXT.centerY);

    this.donut = new Donut(this.ctx, gameObjects.DONUT.x, gameObjects.DONUT.y);
    this.homer = new Homer(this.ctx, gameObjects.HOMER.x, gameObjects.HOMER.y);

    this.scoreText = new CanvasText(this.ctx, 'Score: 0',
      gameObjects.TEXT.x, gameObjects.TEXT.y);

    this.velocityText = new CanvasText(this.ctx, 'Velocity: 0',
      gameObjects.TEXT.x, gameObjects.TEXT.y + gameObjects.TEXT.dy * 2);

    this.angleText = new CanvasText(this.ctx, 'Angle: 0',
      gameObjects.TEXT.x, gameObjects.TEXT.y + gameObjects.TEXT.dy * 3);

    this.livesImg = new Circle(this.ctx, gameObjects.DONUT.radius * 0.9);
    this.livesImg.x = gameObjects.TEXT.x - 20;
    this.livesImg.y = gameObjects.TEXT.y + gameObjects.TEXT.dy * 4;

    this.livesValue = new CanvasText(this.ctx, '10',
      this.livesImg.x + this.livesImg.radius * 2 + 10,
      this.livesImg.y + this.livesImg.radius + 15);

    this.state = {
      SCORE: 0,

      DONUT: {
        donutCount: gameObjects.DONUT.count,
        donutInFlight: false,
        launchTime: 0,
        vX: gameObjects.DONUT.vX,
      },

      MOUSE_POS: {x: 200, y: 20},
    };

    this.renderScene = this.renderScene.bind(this);
    this.onStateChanged = this.onStateChanged.bind(this);
    this.stop = this.stop.bind(this);
    this.donutMove = this.donutMove.bind(this);
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

    if (this.state.DONUT.donutInFlight) {
      this.donutFly(delay, now);
    }

    this.scoreText.setText(`Score: ${this.state.SCORE}`);
    this.velocityText.setText(`Velocity: ${this.donut.v}`);
    this.angleText.setText(`Angle: ${-Math.round(this.donut.angle * 180 / Math.PI)}`);
    this.livesValue.setText(`${this.state.DONUT.donutCount}`);

    this.homer.render();
    this.donut.render();
    this.scoreText.render();
    this.velocityText.render();
    this.angleText.render();
    this.livesImg.render();
    this.livesValue.render();

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
    if (direction === 'RIGHT' && this.donut.x + this.donut.vX < this.ctx.canvas.width - 140) {
      this.donut.x += this.donut.vX;
    }

    if (direction === 'LEFT' && this.donut.x - this.donut.vX > 10) {
      this.donut.x -= this.donut.vX;
    }

    this.donut.changedX = this.donut.x;
  }

  donutFly(delay, now) {
    const t = now - this.state.DONUT.launchTime;

    this.flightState = this.donut.fly(delay, t, {x: this.homer.x, y: this.homer.y});

    if (this.flightState.onBottom) {
      this.donut.reset();
      EventBus.emit(events.GAME.ON_BOTTOM);

    } else if (this.flightState.collision) {
      this.donut.reset();
      EventBus.emit(events.GAME.COLLISION);
    }
  }

  onStateChanged(state) {
    this.state = state;
    this.donut.countAngle(this.state.MOUSE_POS);
    this.donut.countVelocity(this.state.MOUSE_POS);
  }

}

