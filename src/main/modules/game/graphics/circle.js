import Figure from './figure.js';
import Logger from '../../../utils/logger.js';

export default class Circle extends Figure {
  constructor(ctx, radius) {
    super(ctx);
    this.radius = radius;
    this.width = radius * 2;

    this.img = new Image(this.width, this.width);
    this.img.src = '/img/donut.png';
  }

  draw() {
    const ctx = this.ctx;
    try {
      ctx.beginPath();
      this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
      ctx.closePath();
      ctx.fill();
    } catch (e) {
      Logger.log(e);
    }
  }

  render() {
    this.ctx.save();
    this.draw();
    this.ctx.restore();
  }

}
