import Figure from '../graphics/figure.js';
import Circle from '../graphics/circle.js';
import {gameObjects} from '../graphics/gameObjects.js';
import Logger from '../../../utils/logger.js';

const g = 9.81;

export default class Donut extends Figure {
  constructor(ctx, x, y) {
    super(ctx);
    this.x = x;
    this.y = y;

    this.v = gameObjects.DONUT.v;

    this.angle = 0;
    this.onBottom = false;

    this.body = new Circle(ctx, gameObjects.DONUT.radius, gameObjects.DONUT.color);
  }

  //Лети, бро
  fly(dt, flightTime) {
    this.vY = g * flightTime - this.v * Math.sin(this.angle);
    this.vX = this.v * Math.cos(this.angle);

    let dx = this.vX * dt * 0.01;
    let dy = this.vY * dt * 0.0001;

    Logger.log('Donat dx, dy:', dx, dy);

    if (this.y + gameObjects.DONUT.radius + dy < this.ctx.canvas.height) {
      this.y += dy;
      this.onBottom = false;
    } else {
      dx = 0;
      this.onBottom = true;
    }

    if (this.x + gameObjects.DONUT.radius + dx < this.ctx.canvas.width) {
      this.x += dx;
    }

    Logger.log('Donat coords: ', this.x, this.y);

    return {
      onBottom: this.onBottom,
    };
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
    Logger.log('New angle for Donut: ', this.angle);
    this.angle = Math.atan((mousePos.y - this.y) / (mousePos.x - this.x));
  }

  reset() {
    this.x = gameObjects.DONUT.x;
    this.y = gameObjects.DONUT.y;

    this.v = gameObjects.DONUT.v;

    this.angle = 0;

  }
}