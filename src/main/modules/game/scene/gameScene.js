import EventBus from '../../eventBus.js';

export default class GameScene {
  constructor(canvas) {
    this.bus = EventBus;
    this.ctx = canvas.getContext('2d');
    this.scene = new GameScene(this.ctx);

    this.requestFrameId = null;
    this.lastFrameTime = 0;

    this.state = null;
  }
}

