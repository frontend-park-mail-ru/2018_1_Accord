
import TextField from '../../../components/blocks/textField.js';
import userService from '../../../services/UserService.js';

const userDataTemplate = window.fest['main/components/pages/Profile.tmpl'];

export default class Profile  {
  constructor() {
  }

  render() {
    this.profile = document.createElement('div');
    this.title = new TextField('Hi!');

    this.profile.appendChild(this.title.render());

    userService.getUser()
      .then((user) => {
        if (user) {
          this.userDataText = document.createElement('div');
          this.userDataText.innerHTML = userDataTemplate(user.getProfileData());

          this.profile.appendChild(this.userDataText);

        }
      });

    return this.profile;
  }
}