import EventBus from '../../eventBus.js';
import Donut from './Donut.js';
import Homer from './Homer.js';
import {gameObjects} from '../graphics/gameObjects.js';

export default class GameScene {
  constructor(canvas) {
    this.bus = EventBus;
    this.ctx = canvas.getContext('2d');

    this.requestFrameId = null;
    this.lastFrameTime = 0;

    this.firstDonut = null;
    this.homer = null;

    this.renderScene = this.renderScene.bind(this);
  }

  init() {
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
    this.firstDonut.fly(delay);
    //this.firstDonat actions

    this.homer.render();
    this.firstDonut.render();

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
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);    //this.scene.clear();
  }
}

