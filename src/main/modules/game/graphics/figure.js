export default class Figure {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
  }

  render() {
    this.ctx.save();
    this.setup();
    this.draw();
    this.ctx.restore();
  }

  draw() {

  }

  setup() {

  }
}