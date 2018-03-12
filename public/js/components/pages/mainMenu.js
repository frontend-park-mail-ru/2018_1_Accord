import Button from '../blocks/button.js';
import Section from './section.js';
import SectionDispatcher from '../../modules/SectionDispatcher.js';
import TextField from '../blocks/textField.js';
import UserService from '../../modules/UserService.js';
import Logger from '../../utils/logger.js';
import {fetchFaildErrors} from '../../config/textErrors.js';


export default class MenuSection extends Section {
  constructor() {
    super();

  }

  render() {
    this.menu = document.createElement('div');

    this.title = new TextField('Bubble Wars');
    this.playButton = new Button('button', 'Play');

    this.menu.appendChild(this.title.render());
    this.menu.appendChild(this.playButton.render());

    this.playButton.onClick(() => {
      SectionDispatcher.changeSection('Play');
    });

    UserService.getUser()
      .then((user) => {
        if (!user) {
          this.loginButton = new Button('button', 'Login');
          this.signupButton = new Button('button', 'Signup');

          this.menu.appendChild(this.loginButton.render());
          this.menu.appendChild(this.signupButton.render());

          this.loginButton.onClick(() => {
            SectionDispatcher.changeSection('Login');
          });

          this.signupButton.onClick(() => {
            SectionDispatcher.changeSection('Signup');
          });
        } else {
          this.logoutButton = new Button('button', 'Logout');
          this.menu.appendChild(this.logoutButton.render());

          this.logoutButton.onClick(() => {
            UserService.logout()
              .then(() => SectionDispatcher.changeSection('Menu'))
              .catch(() => SectionDispatcher.changeSection('Menu'));
            //TODO: обработать неуспешный выход
          });
        }
      })
      .catch((error) => {
        Logger.error(error);
        this.textError = document.createElement('div');
        this.textError.innerHTML = fetchFaildErrors.noConnection;
        this.menu.appendChild(this.textError);
      });
    return this.menu;
  }

}
