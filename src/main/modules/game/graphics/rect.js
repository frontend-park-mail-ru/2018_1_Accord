import Figure from './figure.js';

export default class Rect extends Figure {
  constructor(ctx, height, width, color) {
    super(ctx);
    this.width = width;
    this.height = height;
    this.ctx.fillStyle = color;
  }

  rotate(degrees) {
    this.rotation = degrees * Math.PI / 180;
  }

  /**
   * @private
   */
  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);

    this.ctx.closePath();
    this.ctx.fill();
  }
}