import Figure from '../graphics/figure.js';
import Rect from '../graphics/rect.js';
import {gameObjects} from '../graphics/gameObjects.js';

export default class Entity extends Figure{
  constructor(ctx, x, y) {
    super(ctx);
    this.x = x;
    this.y = y;
    this.body = new Rect(ctx, gameObjects.HOMER.height, gameObjects.HOMER.width, gameObjects.HOMER.color);
  }

  draw() {
    this.body.x = this.x;
    this.body.y = this.y;

    this.body.render();
  }

  move() {
    this.x = this.body.x + 5;
  }
}