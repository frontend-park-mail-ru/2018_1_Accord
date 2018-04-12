import leaderBoardService from '../../../services/LeaderBoardService.js';
import Logger from '../../../utils/logger.js';
import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import {serverErrors} from '../../../config/textErrors.js';

export default class LeaderBoardView extends BaseView {
  constructor() {
    super('main/views/pages/LeaderBoard/LeaderBoard.tmpl');
    this.page = 1;
  }

  async render() {
    try {
      this.data = await leaderBoardService.getLeaderBoard(this.page);

      if (!this.data) {
        this.errorField = this.el.querySelector(selector.LEADERBOARD_ERROR);
        this.errorField.innerText = `Can't open leader board on page ${this.page}`;
      }
    } catch (err) {
      this.errorField = this.el.querySelector(selector.LEADERBOARD_ERROR);
      this.errorField.innerText = serverErrors.leaderBoard;
      Logger.error(err);
      //TODO: error dispatcher
    }
    super.render(this.data);

    return this;
  }
}