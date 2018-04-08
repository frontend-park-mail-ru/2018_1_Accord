import GameScene from './scene/gameScene.js';

export default class Game {
  constructor(canvas) {
    this.scene = new GameScene(canvas);
  }

  start() {
    this.scene.init();
  }

  destroy() {

  }
}