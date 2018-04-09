import EventBus from '../../eventBus.js';
import Donut from './Donut.js';
import Homer from './Homer.js';

export default class GameScene {
  constructor(canvas) {
    this.bus = EventBus;
    this.ctx = canvas.getContext('2d');

    this.requestFrameId = null;
    this.lastFrameTime = 0;

    this.firstDonut = null;
    this.homer = null;

  }

  init() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.firstDonut = new Donut(this.ctx, 100, 70);
    this.firstDonut.draw();

    this.homer = new Homer(this.ctx, 200, 200);
    this.homer.draw();

    //this.renderScene(Date.now());
  }

  //
  // renderScene(now) {
  //   const scene = this.scene;
  //   const delay = now - this.lastFrameTime;
  //   this.lastFrameTime = now;
  //
  //   scene.render();
  //
  //   this.requestFrameId = requestAnimationFrame(this.renderScene);
  // }

  start() {
    this.lastFrameTime = performance.now();
    this.requestFrameId = requestAnimationFrame(this.renderScene);
  }

  stop() {
    if (this.requestFrameId) {
      window.cancelAnimationFrame(this.requestFrameId);
      this.requestFrameId = null;
    }

    this.scene.clear();
  }
}

