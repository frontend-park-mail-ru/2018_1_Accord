import Figure from '../graphics/figure.js';
import Rect from '../graphics/rect.js';
import {gameObjects} from '../graphics/gameObjects.js';
import Logger from '../../../utils/logger.js';

export default class Entity extends Figure {
  constructor(ctx, x, y) {
    super(ctx);
    this.x = x;
    this.y = y;

    this.vX = 5;
    this.direction = 'left';

    this.body = new Rect(ctx, gameObjects.HOMER.height, gameObjects.HOMER.width, gameObjects.HOMER.color);
  }

  draw() {
    this.body.x = this.x;
    this.body.y = this.y;

    this.body.render();
  }

  move() {
    Logger.log('Homer is moving', this.x);

    switch (this.direction) {
      case 'left':
        if (this.x + gameObjects.HOMER.width + this.vX < gameObjects.CANVAS.width - 10) {
          this.x += this.vX;
        } else {
          this.direction = 'right';
          this.x -= this.vX;
        }
        break;

      case 'right':
        if (this.x - this.vX > 10) {
          this.x -= this.vX;
        } else {
          this.direction = 'left';
          this.x += this.vX;
        }
        break;
    }
    this.body.x = this.x;
  }

}