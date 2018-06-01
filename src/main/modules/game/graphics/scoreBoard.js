import Figure from './figure.js';
import CanvasText from './text.js';
import {gameObjects} from './gameObjects.js';

export default class ScoreBoard extends Figure {
  constructor(ctx, playersCount) {
    super(ctx);
    this.playersCount = playersCount;

    this.title = new CanvasText(ctx, 'Score', gameObjects.TEXT.x, gameObjects.TEXT.y);

    this.scores = [null, null];
    this.scores[0] = new CanvasText(ctx, '0', gameObjects.TEXT.x, gameObjects.TEXT.y + gameObjects.TEXT.dy);
    if (this.playersCount === 2) {
      this.scores[1] = new CanvasText(ctx, '0', gameObjects.TEXT.x + 30, gameObjects.TEXT.y + gameObjects.TEXT.dy);
    }

    this.split = new CanvasText(ctx, ':', gameObjects.TEXT.x + 15, gameObjects.TEXT.y + gameObjects.TEXT.dy);

  }

  draw() {
    this.title.draw();
    if (this.playersCount === 2) {
      this.split.draw();
    }

    this.scores.forEach(value => {
      if (value != null) {
        value.draw();
      }
    });
  }

  render() {
    this.ctx.save();
    this.draw();
    this.ctx.restore();
  }

  /**
   *
   * @param {{player_1: number, player_2: number} || {player_1: number}} scores
   */
  setScore(scores) {
    this.scores[0].setText(`${scores.player_1}`);
    if (this.playersCount === 2) {
      this.scores[1].setText(`${scores.player_2}`);
    }
  }
}
