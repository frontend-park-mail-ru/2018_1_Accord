import TextField from '../../components/blocks/textField.js';

import userService from '../../services/UserService.js';
import Logger from '../../utils/logger.js';


export default class PlaySection  {
  constructor() {
  }

  render() {
    this.play = document.createElement('div');
    this.text = new TextField('Let\'s play!');

    this.play.appendChild(this.text.render());

    userService.getUser()
      .then((user) => {
        if (user) {
          Logger.log('User: ', user);

        } else {
          //TODO
        }
      });

    return this.play;
  }
}