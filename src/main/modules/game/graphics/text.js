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
    this.ctx.beginPath();
    this.ctx.textAlign = 'left';
    this.ctx.fillStyle = '#000000';
    this.ctx.fillText(this.text, this.x, this.y);
    this.ctx.closePath();
    this.ctx.fill();
  }

  setText(text) {
    this.text = text;
  }
}