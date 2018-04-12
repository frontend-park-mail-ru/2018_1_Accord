import EventBus from '../../eventBus.js';
import Donut from './Donut.js';
import Homer from './Homer.js';
import {gameObjects} from '../graphics/gameObjects.js';
import {events} from '../core/events.js';

export default class GameScene {
  constructor(canvas) {
    this.bus = EventBus;
    this.ctx = canvas.getContext('2d');

    this.requestFrameId = null;
    this.lastFrameTime = 0;

    this.firstDonut = null;
    this.homer = null;

    this.state = null;

    this.renderScene = this.renderScene.bind(this);
    this.onStateChanged = this.onStateChanged.bind(this);
  }

  init() {
    EventBus.on(events.GAME.STATE_CHANGED, this.onStateChanged);

    this.state = {
      SCORE: 0,

      DONUT: {
        donutCount: 5,
        donutInFlight: false,
        launchTime: 0,
      },

      MOUSE_POS: {},
    };

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.firstDonut = new Donut(this.ctx, gameObjects.DONUT.x, gameObjects.DONUT.y);
    this.firstDonut.draw();

    this.homer = new Homer(this.ctx, gameObjects.HOMER.x, gameObjects.HOMER.y);
    this.homer.draw();
  }


  renderScene(now) {
    const delay = now - this.lastFrameTime;
    this.lastFrameTime = now;

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.homer.move(delay);

    if (this.state.DONUT.donutInFlight) {
      this.donutMove(delay, now);
    }

    this.homer.render();
    this.firstDonut.render();

    this.requestFrameId = requestAnimationFrame(this.renderScene);
  }

  startScene() {
    this.lastFrameTime = performance.now();
    this.requestFrameId = requestAnimationFrame(this.renderScene);
  }

  stop() {
    //EventBus.off(events.GAME.STATE_CHANGED, this.onStateChanged);

    if (this.requestFrameId) {
      window.cancelAnimationFrame(this.requestFrameId);
      this.requestFrameId = null;
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);    //this.scene.clear();
  }

  donutMove(delay, now) {
    this.firstDonut.v = gameObjects.DONUT.v;
    const t = now - this.state.DONUT.launchTime;

    this.flightState = this.firstDonut.fly(delay, t, {x: this.homer.x, y: this.homer.y});

    if (this.flightState.onBottom) {
      this.firstDonut.reset();
      EventBus.emit(events.GAME.ON_BOTTOM);

    } else if (this.flightState.collision) {
      this.firstDonut.reset();
      EventBus.emit(events.GAME.COLLISION);
    }
  }

  onStateChanged(state) {
    this.state = state;
    this.firstDonut.countAngle(this.state.MOUSE_POS);
  }

}

