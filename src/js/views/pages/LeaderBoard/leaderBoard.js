
import leaderBoardService from '../../../services/LeaderBoardService.js';
import Logger from '../../../utils/logger.js';

const LBTemplate = window.fest['js/components/pages/LeaderBoard/LeaderBoard.tmpl'];

export default class LeaderBoard  {
  constructor() {
    this.page = 1;
  }

  updateLeaderboard(page) {
    this.page = page;

    leaderBoardService.getLeaderBoard(this.page)
      .then((obj) => {
        if (!obj) {
          Logger.log(`Can't open leader board on page ${this.page}`);
          this.leaderBoardTable.innerHTML = 'Empty';
        } else {
          this.leaderBoardTable.innerHTML = LBTemplate(obj.data);
        }
      })
      .catch((err) => {
        Logger.error(err);
        //TODO: error dispatcher
      });
  }

  render() {
    this.leaderBoard = document.createElement('div');
    this.leaderBoardTable = document.createElement('div');

    this.leaderBoard.appendChild(this.leaderBoardTable);

    this.updateLeaderboard(this.page);

    return this.leaderBoard;
  }
}