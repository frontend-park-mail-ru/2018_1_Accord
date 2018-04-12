import Figure from '../graphics/figure.js';
import Rect from '../graphics/rect.js';
import {gameObjects} from '../graphics/gameObjects.js';

export default class Homer extends Figure {
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

  move(dt) {
    const dx = this.vX * dt * 0.01;

    switch (this.direction) {
      case 'left':
        if (this.x + gameObjects.HOMER.width + dx < this.ctx.canvas.width - 10) {
          this.x += dx;
        } else {
          this.direction = 'right';
          this.x -= dx;
        }
        break;

      case 'right':
        if (this.x - dx > 10) {
          this.x -= dx;
        } else {
          this.direction = 'left';
          this.x += dx;
        }
        break;
    }
    this.body.x = this.x;
  }

}