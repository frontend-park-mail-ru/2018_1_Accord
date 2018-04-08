import Figure from '../graphics/figure.js';
import Circle from '../graphics/circle.js';

export default class Entity extends Figure{
  constructor(ctx) {
    super(ctx);

    this.body = new Circle(ctx, 80, '#FF4DA6');
    this.bullet = new Circle(ctx, 5, '#3366FF');
  }

  draw() {
    this.body.x = this.x;
    this.body.y = this.y;

    this.bullet.x = this.x + this.body.radius;
    this.bullet.y = this.y;

    this.body.render();
    this.bullet.render();
  }
}