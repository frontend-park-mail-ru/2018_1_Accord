import Section from '../section.js';
import BackButton from '../../blocks/backButton.js';
import TextField from '../../blocks/textField.js';
import LeaderBoardService from '../../../modules/LeaderBoardService.js';
import Logger from '../../../utils/logger.js';
import Paginator from '../../blocks/Paginator.js';

const LBTemplate = window.fest['js/components/pages/LeaderBoard.tmpl'];

export default class LeaderBoard extends Section {
  constructor() {
    super();
  }

  render() {
    this.leaderBoard = document.createElement('div');
    this.backButton = new BackButton('Play');
    this.title = new TextField('Leader Board');
    this.leaderBoardTable = document.createElement('div');
    this.paginator = new Paginator();

    this.page = 1;

    this.leaderBoard.appendChild(this.backButton.render());
    this.leaderBoard.appendChild(this.title.render());
    this.leaderBoard.appendChild(this.leaderBoardTable);

    this.backButton.onClick();

    LeaderBoardService.getLeaderBoard(this.page)
      .then((json) => {
        if (!json) {
          Logger.log(`Can't open leader board on page ${this.page}`);
          this.leaderBoardTable.innerHTML = 'Empty';
        } else {
          this.leaderBoard.appendChild(this.paginator.render(json.currentPage, json.numberOfPages));
          this.leaderBoardTable.innerHTML = LBTemplate(json);
          Logger.log(json);
        }
      })
      .catch((err) => {
        Logger.error(err);
        //TODO: error dispatcher
      });

    return this.leaderBoard;
  }
}