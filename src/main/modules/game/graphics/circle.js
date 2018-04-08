import Figure from './figure.js';

export default class Circle extends Figure {
  constructor(ctx, radius, color) {
    super(ctx);
    this.radius = radius;
    this.color = color;
  }

  draw() {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);

    ctx.closePath();
    ctx.fill();
  }

  setup() {
    const ctx = this.ctx;

    ctx.translate(this.x, this.y);
    ctx.scale(this.radius, this.radius);
  }
}