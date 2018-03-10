import Section from './section.js';
import LoginForm from '../blocks/loginForm.js';
import UserService from '../../modules/UserService.js';
import Logger from '../../utils/logger.js';
import SectionDispatcher from '../../modules/SectionDispatcher.js';


export default class LoginSection extends Section {
  constructor() {
    super();

  }

  render() {
    this.login = document.createElement('div');
    this.loginForm = new LoginForm();

    this.login.appendChild(this.loginForm.render());

    const submitCallback = (event) => {
      event.preventDefault();

      this.loginForm.checkFormState()
        .then((userData) => UserService.login(userData))
        .then((user) => {
          if (!user) {
            this.loginForm.onSubmit(submitCallback);
            Logger.log('Unsuccessful login');
            return;
          }
          SectionDispatcher.changeSection('Menu');
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
