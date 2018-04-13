import Figure from './figure.js';
import {gameObjects} from './gameObjects.js';

export default class StartText extends Figure {
  constructor(ctx, text, x, y) {
    super(ctx);
    this.x = x;
    this.y = y;

    this.text = text.split('\n');
    this.lineMatgin = gameObjects.TEXT.dy + 30;

    this.ctx.font = `600 ${gameObjects.TEXT.centerSize}px sans-serif`;
  }

  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.textAlign = 'center';
    this.ctx.shadowColor = '#808080';
    this.ctx.shadowOffsetX = 3;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowBlur = 3;

    this.text.forEach((line, index) => {
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.fillText(line, this.x, this.y + this.lineMatgin * index);
    });

    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  setText(text) {
    this.text = text;
  }
}