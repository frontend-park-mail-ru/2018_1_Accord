export default class Figure {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
  }

  render() {
    this.ctx.save();
    this.draw();
    this.ctx.restore();
  }

  draw() {

  }
}