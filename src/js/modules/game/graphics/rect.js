import Figure from './figure.js';

export default class Rect extends Figure {
  constructor(ctx, height, width, color) {
    super(ctx);
    this.width = width;
    this.height = height;
    this.color = color;
    this.ctx.fillStyle = this.color;
  }

  /**
   * @private
   */
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.rect(this.x, this.y, this.width, this.height);

    this.ctx.closePath();
    this.ctx.fill();
  }
}