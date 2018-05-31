import Figure from './figure.js';
import {gameObjects} from './gameObjects.js';
import Circle from './circle.js';
import CanvasText from './text.js';

export default class CanvasLives extends Figure {
  constructor(ctx, livesCount) {
    super(ctx);

    this.livesCount = livesCount;

    this.livesImg = new Circle(this.ctx, gameObjects.DONUT.radius * 0.9);
    this.livesImg.x = 20;
    this.livesImg.y = gameObjects.TEXT.y + gameObjects.TEXT.dy;

    this.livesValue = new CanvasText(this.ctx, `${this.livesCount}`,
      this.livesImg.x + this.livesImg.radius * 2,
      this.livesImg.y + this.livesImg.radius + 15);
  }

  draw() {
    this.livesValue.draw();
  }

  render() {
    this.ctx.save();
    this.livesImg.render();
    this.draw();
    this.ctx.restore();
  }

  setValue(value) {
    this.livesValue.setText(`${value}`);
  }
}
