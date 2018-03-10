import Section from './section.js';
import TextField from '../blocks/textField.js';
import BackButton from '../blocks/backButton.js';

export default class Profile extends Section {
  constructor() {
    super();
  }

  render() {
    this.profile = document.createElement('div');
    this.title = new TextField('Hi!');
    this.backButton = new BackButton('Play');

    this.profile.appendChild(this.backButton.render());
    this.profile.appendChild(this.title.render());

    this.backButton.onClick();

    return this.profile;
  }
}