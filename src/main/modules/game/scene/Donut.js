import Figure from '../graphics/figure.js';
import Circle from '../graphics/circle.js';
import {gameObjects} from '../graphics/gameObjects.js';

export default class Donut extends Figure {
  constructor(ctx, x, y) {
    super(ctx);
    this.x = x;
    this.y = y;

    this.vX = gameObjects.DONUT.vX;
    this.vY = gameObjects.DONUT.vY;

    this.body = new Circle(ctx, gameObjects.DONUT.radius, gameObjects.DONUT.color);
  }

  //Лети, бро
  fly(dt) {
    let dx = this.vX * dt * 0.05;
    const dy = 9.8 * dt * 0.05;

    if (this.y + gameObjects.DONUT.radius + dy < this.ctx.canvas.height) {
      this.y += dy;
    } else {
      dx = 0;
    }

    if (this.x + gameObjects.DONUT.radius + dx < this.ctx.canvas.width) {
      this.x += dx;

    }
  }

  draw() {
    this.body.x = this.x;
    this.body.y = this.y;

    this.body.render();
  }
}