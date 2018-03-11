import Section from '../section.js';
import BackButton from '../../blocks/backButton.js';
import TextField from '../../blocks/textField.js';
import LeaderBoardService from '../../../modules/LeaderBoardService.js';
import Logger from '../../../utils/logger.js';
import Paginator from '../../blocks/Paginator.js';

const LBTemplate = window.fest['js/components/pages/leaderboard/LeaderBoard.tmpl'];

export default class LeaderBoard extends Section {
  constructor() {
    super();
    this.page = 1;
  }

  updateLeaderboard(page) {
    this.page = page;

    LeaderBoardService.getLeaderBoard(this.page)
      .then((obj) => {
        if (!obj) {
          Logger.log(`Can't open leader board on page ${this.page}`);
          this.leaderBoardTable.innerHTML = 'Empty';
        } else {
          this.leaderBoardTable.innerHTML = LBTemplate(obj.data);
          this.paginator.updatePaginator(obj.curPage, obj.pageNum);
        }
      })
      .catch((err) => {
        Logger.error(err);
        //TODO: error dispatcher
      });
  }

  render() {
    this.leaderBoard = document.createElement('div');
    this.backButton = new BackButton('Play');
    this.title = new TextField('Leader Board');
    this.leaderBoardTable = document.createElement('div');
    this.paginator = new Paginator();

    this.leaderBoard.appendChild(this.backButton.render());
    this.leaderBoard.appendChild(this.title.render());
    this.leaderBoard.appendChild(this.leaderBoardTable);

    this.paginator.onClick(this.updateLeaderboard.bind(this));
    this.backButton.onClick();

    this.updateLeaderboard(this.page);

    this.leaderBoard.appendChild(this.paginator.render());

    return this.leaderBoard;
  }
}