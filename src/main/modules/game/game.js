import GameScene from './scene/gameScene.js';
import GameControllers from './controllers.js';
import {gameSettings} from '../../config/gameSettings.js';
import SinglePlayer from './core/singlePlayer.js';
import MultiPlayer from './core/multiPlayer.js';
import Logger from '../../utils/logger.js';

export default class Game {
  /**
   *
   * @param canvas
   * @param { {mode: string, player: string, user: User, level: number} } gameSettings
   */
  constructor(canvas, settings) {
    this.controller = new GameControllers();
    this.gameSettings = settings;

    if (this.gameSettings.player === gameSettings.player.SINGLE_PLAYER) {
      this.scene = new GameScene(canvas, false);
      this.gameEngine = new SinglePlayer(this.scene, this.controller);
    }
    else if (this.gameSettings.player === gameSettings.player.BATTLE) {
      this.scene = new GameScene(canvas, true);
      this.gameEngine = new MultiPlayer(this.scene, this.controller);
    }
  }

  start() {
    this.gameEngine.start();
  }

  destroy() {
    this.gameEngine.destroy();
  }
}
