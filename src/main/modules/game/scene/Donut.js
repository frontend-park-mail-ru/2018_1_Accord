import Figure from '../graphics/figure.js';
import Circle from '../graphics/circle.js';
import {gameObjects} from '../graphics/gameObjects.js';

const g = 9.81;

export default class Donut extends Figure {
  constructor(ctx, x, y) {
    super(ctx);
    this.x = x;
    this.y = y;

    this.v = gameObjects.DONUT.v;
    this.vX = gameObjects.DONUT.vX;
    this.changedX = this.x;

    this.angle = 0;
    this.onBottom = false;

    this.radius = gameObjects.DONUT.radius;

    this.body = new Circle(ctx, this.radius);
  }

  //Лети, бро
  /**
   *
   * @param {Number} dt
   * @param {Number} flightTime
   * @param {{x: number, y: number}} collCoords - collision object coordinates
   * @returns {{onBottom: boolean, collision: boolean}}
   */
  fly(dt, flightTime, collCoords) {
    this.vY = g * flightTime - this.v * Math.sin(this.angle);
    this.vX = this.v * Math.cos(this.angle);

    let dx = this.vX * dt * 0.01;
    let dy = this.vY * dt * 0.0001;

    if (this.y + this.radius * 2 + dy < this.ctx.canvas.height) {
      this.y += dy;
      this.onBottom = false;

      if (this.x + this.radius * 2 + dx < this.ctx.canvas.width) {
        this.x += dx;
      }

      if (this.x + this.radius >= collCoords.x &&
        this.x + this.radius <= collCoords.x + gameObjects.HOMER.width / 2 &&
        this.y + this.radius >= collCoords.y &&
        this.y + this.radius <= collCoords.y + gameObjects.HOMER.height / 3) {

        this.onBottom = false;
        this.collision = true;
      } else {
        this.collision = false;
      }
    } else {
      this.onBottom = true;
    }

    return {
      onBottom: this.onBottom,
      collision: this.collision
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
    this.angle = Math.atan((mousePos.y - this.y) / (mousePos.x - this.x)) || 0;
  }

  reset() {
    this.x = this.changedX;
    this.y = gameObjects.DONUT.y;

    this.v = gameObjects.DONUT.v;

    this.angle = 0;

  }
}