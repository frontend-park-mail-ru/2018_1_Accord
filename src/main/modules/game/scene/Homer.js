import Figure from '../graphics/figure.js';
import Rect from '../graphics/rect.js';

export default class Entity extends Figure{
  constructor(ctx, x, y) {
    super(ctx);
    this.x = x;
    this.y = y;
    this.body = new Rect(ctx, 100, 80, '#FFD633');
  }

  draw() {
    this.body.x = this.x;
    this.body.y = this.y;

    this.body.render();
  }
}