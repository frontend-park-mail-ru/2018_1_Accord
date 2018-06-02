import leaderBoardService from '../../../services/LeaderBoardService.js';
import Logger from '../../../utils/logger.js';
import BaseView from '../../view/baseView.js';
import {selector} from '../../../config/selector.js';
import {serverErrors} from '../../../config/textErrors.js';
import NavBar from '../../../components/blocks/navBar/navBar.js';

export default class LeaderBoardView extends BaseView {
  constructor() {
    super('main/views/pages/LeaderBoard/LeaderBoard.tmpl');
    this.page = 1;

    this.navBar = [
      selector.BACK_BUTTON,
      selector.MUTE_BUTTON,
      selector.SETTINGS_BUTTON
    ];
  }

  render() {
    leaderBoardService.getLeaderBoard(this.page)
      .then((data) => {
        if (!data) {
          this.errorField = this.el.querySelector(selector.LEADERBOARD_ERROR);
          this.errorField.innerText = `Can't open leader board on page ${this.page}`;
        }
        else {
          this.loader.style.display = 'none';
          super.render(data);
          new NavBar(this.el, this.navBar, this.user);
        }
      })
      .catch((error) => {
        this.errorField = this.el.querySelector(selector.LEADERBOARD_ERROR);
        this.errorField.innerText = serverErrors.leaderBoard;
        Logger.error(error);
        //TODO: error dispatcher
      });
    return this;
  }
}