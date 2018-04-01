import Section from './section.js';
import Router from '../../modules/router.js';
import TextField from '../../components/blocks/textField.js';
import BackButton from '../../components/blocks/backButton.js';
import Button from '../../components/blocks/button.js';
import userService from '../../services/UserService.js';


export default class PlaySection extends Section {
  constructor() {
    super();
  }

  render() {
    this.play = document.createElement('div');
    this.text = new TextField('Let\'s play!');
    this.leaderBoardButton = new Button('button', 'Leader Board');
    this.backButton = new BackButton('Menu');

    this.play.appendChild(this.backButton.render());
    this.play.appendChild(this.text.render());
    this.play.appendChild(this.leaderBoardButton.render());

    this.leaderBoardButton.onClick(() => {
      Router.changeSection('LeaderBoard');
    });

    this.backButton.onClick();

    userService.getUser()
      .then((user) => {
        if (user) {
          this.profile = new Button('button', 'Profile');
          this.play.appendChild(this.profile.render());

          this.profile.onClick(() => {
            Router.changeSection('Profile');
          });

        } else {
          this.loginButton = new Button('button', 'Login');
          this.signupButton = new Button('button', 'Signup');
          this.text = new TextField('Would you like to login or sign up?');

          this.play.appendChild(this.text.render());
          this.play.appendChild(this.loginButton.render());
          this.play.appendChild(this.signupButton.render());

          this.loginButton.onClick(() => {
            Router.changeSection('Login');
          });

          this.signupButton.onClick(() => {
            Router.changeSection('Signup');
          });
        }
      });

    return this.play;
  }
}