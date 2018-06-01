import Figure from '../graphics/figure.js';
import Circle from '../graphics/circle.js';
import {gameObjects} from '../graphics/gameObjects.js';

export default class Donut extends Figure {
  constructor(ctx, position) {
    super(ctx);
    this.y = gameObjects.DONUT.y;
    this.position = position;

    if (this.position === 'LEFT') {
      this.startX = this.x = gameObjects.DONUT.xLeft;
    } else if (this.position === 'RIGHT') {
      this.startX = this.x = gameObjects.DONUT.xRight;
    }

    this.v = gameObjects.DONUT.v;
    this.angle = 0;
    this.dYMove = gameObjects.DONUT.dYMove;

    this.radius = gameObjects.DONUT.radius;
    this.body = new Circle(ctx, this.radius);

    this.result = {
      missed: false,
      hit: false,
    };
  }

  //Лети, бро
  /**
   *
   * @param {Number} dt
   * @param {{x: number, y: number}} collCoords - collision object coordinates
   *
   */
  fly(dt, collCoords) {
    const dx = dt * this.v * Math.cos(this.angle) * 0.01;
    const dy = dt * this.v * Math.sin(this.angle) * 0.01;

    this.x += this.position === 'LEFT' ? dx : -dx;
    this.y -= dy;

    this.checkCollision(collCoords);

    return this.result;
  }

  draw() {
    this.body.x = this.x;
    this.body.y = this.y;

    this.body.render();
  }

  /**
   *
   * @param {{x: number, y: number}} mousePos
   */
  countAngle(mousePos) {
    const dy = mousePos.y - this.y;
    const dx = mousePos.x - this.x;

    this.angle = -Math.atan(dy / dx) || 0; //?????//??
  }

  countVelocity(mousePos) {
    const a = Math.abs(mousePos.y - this.y);
    const b = Math.abs(mousePos.x - this.x);

    this.v = Math.round(Math.sqrt(a ** 2 + b ** 2) * 0.2);
    if (this.v > 100) {
      this.v = 100;
    }
  }

  checkCollision(collCoords) {
    if (this.x > this.ctx.canvas.width || this.x + this.radius * 2 < 0 || this.y > this.ctx.canvas.height || this.y < 0) {
      this.result.missed = true;
      this.result.hit = false;
      this.reset();
      return;
    }

    if (this.y <= collCoords.y
      && this.x >= collCoords.x
      && this.x <= collCoords.x + gameObjects.HOMER.width) {

      this.result.hit = true;
      this.result.missed = false;
      this.reset();
    }
  }

  reset() {
    this.y = gameObjects.DONUT.y;
    this.x = this.startX;
    this.v = gameObjects.DONUT.v;
    this.angle = 0;
  }
}
