import Figure from './figure.js';
import {gameObjects} from './gameObjects.js';

export default class CanvasText extends Figure {
  constructor(ctx, text, x, y) {
    super(ctx);
    this.x = x;
    this.y = y;

    this.text = text;

    this.ctx.font = `${gameObjects.TEXT.size}px sans-serif`;
  }

  draw() {
    this.ctx.save();
    this.ctx.beginPath();

    this.ctx.textAlign = 'left';
    this.ctx.fillStyle = '#FFFFFF';

    this.ctx.shadowColor = '#808080';
    this.ctx.shadowOffsetX = 3;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowBlur = 3;

    this.ctx.fillText(this.text, this.x, this.y);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();
  }

  setText(text) {
    this.text = text;
  }
}