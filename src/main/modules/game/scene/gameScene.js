import EventBus from '../../eventBus.js';
import Entity from './entity.js';
import Logger from '../../../utils/logger.js';
import Scene from '../graphics/scene.js'

export default class GameScene {
  constructor(canvas) {
    this.bus = EventBus;
    Logger.log(canvas, ' from game scene file');
    this.ctx = canvas.getContext('2d');
    Logger.log(this.ctx);
    this.scene = new Scene(this.ctx);

    this.requestFrameId = null;
    this.lastFrameTime = 0;

    this.state = null;

    this.rightPlayer = null;
  }

  init() {
    this.rightPlayer = new Entity(this.ctx);
    this.rightPlayer.x = 30;
    this.rightPlayer.y = 200;
    this.rightPlayer.id = this.scene.push(this.rightPlayer);
    this.rightPlayer.draw();
  }
}

