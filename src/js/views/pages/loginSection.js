import Section from './section.js';
import LoginForm from '../../components/forms/loginForm.js';
import userService from '../../services/UserService.js';
import Logger from '../../utils/logger.js';
import Router from '../../modules/router.js';
import BackButton from '../../components/buttons/backButton.js';
import {serverErrors} from '../../config/textErrors.js';


export default class LoginSection extends Section {
  constructor() {
    super();

  }

  render() {
    this.login = document.createElement('div');
    this.loginForm = new LoginForm();
    this.backButton = new BackButton('Menu');
    this.infoField = document.createElement('div');
    this.infoField.style.display = 'none';

    this.login.appendChild(this.backButton.render());
    this.login.appendChild(this.infoField);
    this.login.appendChild(this.loginForm.render());

    this.backButton.onClick();

    const submitCallback = (event) => {
      event.preventDefault();

      this.loginForm.checkFormState()
        .then((userData) => userService.login(userData))
        .then((user) => {
          if (!user) {
            this.loginForm.onSubmit(submitCallback);
            this.infoField.innerHTML = serverErrors.login;
            this.infoField.style.display = 'block';
            Logger.log('Unsuccessful login');
            return;
          }
          Router.changeSection('Play');
        })
        .catch((err) => {
          this.loginForm.onSubmit(submitCallback);
          Logger.error(err);
          //TODO:Error dispatcher
        });
    };

    this.loginForm.onSubmit(submitCallback);

    return this.login;
  }
}
