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

  draw() {
    this.body.x = this.x;
    this.body.y = this.y;

    this.body.render();
  }
}