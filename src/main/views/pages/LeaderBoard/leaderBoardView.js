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

  updateLeaderboard(page) {
    this.page = page;

    leaderBoardService.getLeaderBoard(this.page)
      .then((obj) => {
        if (!obj) {
          super.render();
          this.errorField = this.el.querySelector(selector.LEADERBOARD_ERROR);
          this.errorField.innerText = `Can't open leader board on page ${this.page}`;
        } else {
          super.render(obj);
        }
      })
      .catch((err) => {
        super.render('error');
        Logger.log(this.el);
        this.errorField = this.el.querySelector(selector.LEADERBOARD_ERROR);
        this.errorField.innerText = serverErrors.leaderBoard;
        Logger.error(err);
        //TODO: error dispatcher
      });
  }

  render() {
    this.updateLeaderboard(this.page);

    return this;
  }
}