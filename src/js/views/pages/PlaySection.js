import Section from './section.js';
import Router from '../../modules/router.js';
import TextField from '../../components/blocks/textField.js';
import BackButton from '../../components/buttons/backButton.js';

import userService from '../../services/UserService.js';


export default class PlaySection extends Section {
  constructor() {
    super();
  }

  render() {
    this.play = document.createElement('div');
    this.text = new TextField('Let\'s play!');
    this.backButton = new BackButton('Menu');

    this.play.appendChild(this.backButton.render());
    this.play.appendChild(this.text.render());

    this.backButton.onClick();

    userService.getUser()
      .then((user) => {
        if (user) {

          this.profile.onClick(() => {
            Router.changeSection('Profile');
          });

        } else {
          //TODO
        }
      });

    return this.play;
  }
}