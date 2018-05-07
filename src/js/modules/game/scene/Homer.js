import Figure from '../graphics/figure.js';
import {gameObjects} from '../graphics/gameObjects.js';

export default class Homer extends Figure {
  constructor(ctx, x, y) {
    super(ctx);
    this.x = x;
    this.y = y;

    this.vX = 15;
    this.direction = 'right';

    this.width = gameObjects.HOMER.width;
    this.height = gameObjects.HOMER.height;

    this.imgLeft = new Image(this.width, this.height);
    this.imgLeft.src = '/../../../../img/homer_simpson_left.png';

    this.imgRight = new Image(this.width, this.height);
    this.imgRight.src = '/../../../../img/homer_simpson_right.png';

    this.curImg = this.imgRight;
  }

  draw() {
    this.ctx.drawImage(this.curImg, this.x, this.y, this.width, this.height);
  }

  move(dt) {
    const dx = this.vX * dt * 0.01;

    switch (this.direction) {
      case 'right':
        if (this.x + gameObjects.HOMER.width + dx < this.ctx.canvas.width) {
          this.x += dx;
        } else {
          this.direction = 'left';
          this.x -= dx;
          this.curImg = this.imgLeft;
        }
        break;

      case 'left':
        if (this.x - dx > 10) {
          this.x -= dx;
        } else {
          this.direction = 'right';
          this.x += dx;
          this.curImg = this.imgRight;
        }
        break;
    }
  }

}