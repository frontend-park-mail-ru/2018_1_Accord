import GameScene from './scene/gameScene.js';
import GameControllers from './controllers.js';
import GameEngine from './core/engine.js';

export default class Game {
  constructor(canvas) {
    this.scene = new GameScene(canvas);
    this.controller = new GameControllers();
    this.gameEngine = new GameEngine(this.scene, this.controller);
  }

  start() {
    this.gameEngine.start();
  }

  destroy() {
    this.gameEngine.destroy();
  }
}