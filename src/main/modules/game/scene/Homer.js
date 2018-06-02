import Figure from '../graphics/figure.js';
import {gameObjects} from '../graphics/gameObjects.js';
import Logger from '../../../utils/logger.js';
import {selector} from '../../../config/selector.js';

export default class Homer extends Figure {
  constructor(ctx, x, y) {
    super(ctx);
    this.x = x;
    this.y = y;

    this.vX = 15;
    this.direction = 'up';

    this.width = gameObjects.HOMER.width;
    this.height = gameObjects.HOMER.height;

    this.imgLeft = new Image(this.width, this.height);
    this.imgLeft.src = '/img/homer_simpson_left.png';

    this.imgRight = new Image(this.width, this.height);
    this.imgRight.src = '/img/homer_simpson_right.png';

    this.curImg = this.imgRight;
  }

  draw() {
    try {
      this.ctx.drawImage(this.curImg, this.x, this.y, this.width, this.height);
    } catch (error) {
      Logger.log(error);
      const errorField = document.querySelector(selector.GAME_ERROR);
      errorField.style.display = 'block';
      errorField.innerHTML = 'Can not load some images, check connection';
    }
  }

  move(dt) {
    const dy = this.vX * dt * 0.01;

    switch (this.direction) {
      case 'down':
        if (this.y + gameObjects.HOMER.height + dy < this.ctx.canvas.height) {
          this.y += dy;
        } else {
          this.direction = 'up';
          this.curImg = this.imgLeft;
        }
        break;

      case 'up':
        if (this.y - dy > 10) {
          this.y -= dy;
        } else {
          this.direction = 'down';
          this.curImg = this.imgRight;
        }
        break;
    }
  }

}
