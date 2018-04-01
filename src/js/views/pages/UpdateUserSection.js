import Section from './section.js';
import UpdateUserForm from '../../components/forms/updateUserForm.js';
import TextField from '../../components/blocks/textField.js';
import BackButton from '../../components/blocks/backButton.js';
import userService from '../../services/UserService.js';
import {serverErrors} from '../../config/textErrors.js';
import Router from '../../modules/router.js';
import Logger from '../../utils/logger.js';

export default class UpdateUserSection extends Section {
  constructor() {
    super();
  }

  render() {
    this.update = document.createElement('div');
    this.infoField = document.createElement('div');
    this.infoField.style.display = 'none';
    this.title = new TextField('Update your profile');
    this.backButton = new BackButton('Profile');

    this.backButton.onClick();

    this.email = new UpdateUserForm('email');
    this.username = new UpdateUserForm('username');
    this.password = new UpdateUserForm('password');

    this.update.appendChild(this.backButton.render());
    this.update.appendChild(this.title.render());
    this.update.appendChild(this.email.render());
    this.update.appendChild(this.username.render());
    this.update.appendChild(this.password.render());
    this.update.appendChild(this.infoField);

    /**
     *
     * @param {Event} event
     * @param {Object} userData
     * @param {String} type
     */
    const submitCallback = (event, userData, type) => {
      event.preventDefault();

      userService.update(userData)
        .then((status) => {
          if (!status) {
            this.infoField.innerHTML = serverErrors.updateNotLogin;
            this.infoField.style.display = 'block';
            callbackDispatcher(type);
            return;
          }
          Router.changeSection('Profile');
        })
        .catch((err) => {
          this.infoField.innerHTML = serverErrors.unexpected;
          this.infoField.style.display = 'block';
          callbackDispatcher(type);
          Logger.error(err);
          //TODO НОРМАЛЬНО ВСЕ ПЕРЕДЕЛАТЬ
        });
    };

    const callbackDispatcher = (type) => {
      switch (type) {
        case 'email':
          this.email.onSubmit(emailCallback);
          break;
        case 'username':
          this.username.onSubmit(usernameCallback);
          break;
        case 'password':
          this.password.onSubmit(passwordCallback);
          break;
      }
    };

    const emailCallback = () => {
      const userData = {
        email: this.email.getFormData(),
        password: '',
        nickname: ''
      };

      submitCallback(event, userData, 'email');
    };

    const usernameCallback = () => {
      const userData = {
        email: '',
        password: '',
        nickname: this.username.getFormData()
      };

      submitCallback(event, userData, 'username');
    };

    const passwordCallback = () => {
      const userData = {
        email: '',
        password: this.password.getFormData(),
        nickname: ''
      };

      submitCallback(event, userData, 'password');
    };

    this.email.onSubmit(emailCallback);

    this.username.onSubmit(usernameCallback);

    this.password.onSubmit(passwordCallback);

    return this.update;
  }
}