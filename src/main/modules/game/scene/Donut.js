import Figure from '../graphics/figure.js';
import Circle from '../graphics/circle.js';

export default class Donut extends Figure {
  constructor(ctx, x, y) {
    super(ctx);
    this.x = x;
    this.y = y;

    this.body = new Circle(ctx, 20, '#FF4DA6');
  }

  draw() {
    this.body.x = this.x;
    this.body.y = this.y;

    this.body.render();
  }
}