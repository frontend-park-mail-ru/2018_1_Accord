import Section from './section.js';
import TextField from '../../components/blocks/textField.js';
import BackButton from '../../components/blocks/backButton.js';
import UserService from '../../services/UserService.js';
import Button from '../../components/blocks/button.js';
import Router from '../../modules/router.js';

const userDataTemplate = window.fest['js/components/pages/Profile.tmpl'];

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

    UserService.getUser()
      .then((user) => {
        if (user) {
          this.userDataText = document.createElement('div');
          this.userDataText.innerHTML = userDataTemplate(user.getProfileData());

          this.updateButton = new Button('button', 'Update');

          this.profile.appendChild(this.userDataText);
          this.profile.appendChild(this.updateButton.render());

          this.updateButton.onClick(() => {
            Router.changeSection('Update');
          });
        }
      });

    return this.profile;
  }
}