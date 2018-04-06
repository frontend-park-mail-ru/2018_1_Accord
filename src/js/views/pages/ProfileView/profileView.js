import TextField from '../../../components/blocks/textField.js';
import userService from '../../../services/UserService.js';

const userDataTemplate = window.fest['js/components/pages/Profile.tmpl'];

export default class ProfileView  {
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
