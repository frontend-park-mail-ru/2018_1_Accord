import Figure from './figure.js';

export default class CanvasText extends Figure {
  constructor(ctx, text, x, y) {
    super(ctx);
    this.x = x;
    this.y = y;

    this.text = text;

    this.ctx.font = '20px Arial';
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#000000';
    this.ctx.fillText(this.text, this.x, this.y);
    this.ctx.closePath();
    this.ctx.fill();
  }

  setText(text) {
    this.text = text;
  }
}