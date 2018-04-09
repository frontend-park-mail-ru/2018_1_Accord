import Figure from './figure.js';

export default class Circle extends Figure {
  constructor(ctx, radius, color) {
    super(ctx);
    this.radius = radius;
    this.color = color;
    ctx.fillStyle = this.color;
  }

  draw() {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

}