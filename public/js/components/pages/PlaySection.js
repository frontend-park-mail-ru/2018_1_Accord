import Section from './section.js';
import SectionDispatcher from '../../modules/SectionDispatcher.js';
import TextField from '../blocks/textField.js';
import BackButton from '../blocks/backButton.js';
import Button from '../blocks/button.js';


export default class PlaySection extends Section {
  constructor() {
    super();
  }

  render() {
    this.play = document.createElement('div');
    this.text = new TextField('Let\'s play!');
    this.leaderBoardButton = new Button('button', 'Leader Board');
    this.backButton = new BackButton('Menu');

    this.play.appendChild(this.text.render());
    this.play.appendChild(this.leaderBoardButton.render());
    this.play.appendChild(this.backButton.render());

    this.leaderBoardButton.onClick(() => {
      SectionDispatcher.changeSection('LeaderBoard');
    });

    this.backButton.onClick();

    return this.play;
  }
}