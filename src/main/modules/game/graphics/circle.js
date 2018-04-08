import Figure from './figure.js';

export default class Circle extends Figure {
  constructor(ctx) {
    super(ctx);
    this.radius = 0;
  }
}