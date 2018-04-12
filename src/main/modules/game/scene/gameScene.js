import EventBus from '../../eventBus.js';
import Donut from './Donut.js';
import Homer from './Homer.js';
import {gameObjects} from '../graphics/gameObjects.js';
import {events} from '../core/events.js';
import CanvasText from '../graphics/text.js';
import Circle from '../graphics/circle.js';

export default class GameScene {
  constructor(canvas) {
    this.bus = EventBus;
    this.ctx = canvas.getContext('2d');

    this.requestFrameId = null;
    this.lastFrameTime = 0;

    this.donut = null;
    this.homer = null;
    this.scoreText = null;
    this.angleText = null;
    this.livesImg = null;
    this.livesValue = null;

    this.state = null;

    this.renderScene = this.renderScene.bind(this);
    this.onStateChanged = this.onStateChanged.bind(this);
    this.stop = this.stop.bind(this);
  }

  init() {
    EventBus.on(events.GAME.STATE_CHANGED, this.onStateChanged);
    EventBus.on(events.GAME.FINISH, this.stop);

    this.state = {
      SCORE: 0,

      DONUT: {
        donutCount: gameObjects.DONUT.count,
        donutInFlight: false,
        launchTime: 0,
      },

      MOUSE_POS: {},
    };

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.donut = new Donut(this.ctx, gameObjects.DONUT.x, gameObjects.DONUT.y);
    this.donut.draw();

    this.homer = new Homer(this.ctx, gameObjects.HOMER.x, gameObjects.HOMER.y);
    this.homer.draw();

    this.scoreText = new CanvasText(this.ctx, 'Score: 0',
      this.ctx.canvas.width - 120, 30);

    this.scoreText.draw();

    this.angleText = new CanvasText(this.ctx, 'Angle: 0',
      this.ctx.canvas.width - 120, 60);

    this.angleText.draw();

    this.livesImg = new Circle(this.ctx, gameObjects.DONUT.radius);
    this.livesImg.x = this.ctx.canvas.width - 120;
    this.livesImg.y = 75;
    this.livesImg.draw();

    this.livesValue = new CanvasText(this.ctx, '10',
      this.ctx.canvas.width - 65,
      this.livesImg.y + this.livesImg.radius);

    this.livesValue.draw();
  }


  renderScene(now) {
    const delay = now - this.lastFrameTime;
    this.lastFrameTime = now;

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.homer.move(delay);

    if (this.state.DONUT.donutInFlight) {
      this.donutMove(delay, now);
    }

    this.scoreText.setText(`Score: ${this.state.SCORE}`);
    this.angleText.setText(`Angle: ${-Math.round(this.donut.angle * 180 / Math.PI)}`);
    this.livesValue.setText(`${this.state.DONUT.donutCount}`);

    this.homer.render();
    this.donut.render();
    this.scoreText.render();
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
    EventBus.off(events.GAME.FINISH, this.stop);
  }

  donutMove(delay, now) {
    this.donut.v = gameObjects.DONUT.v;
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
  }

}

