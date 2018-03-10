import Section from './section.js';
import SignupForm from '../blocks/signupForm.js';
import UserService from '../../modules/UserService.js';
import Logger from '../../utils/logger.js';
import SectionDispatcher from '../../modules/SectionDispatcher.js';
import BackButton from '../blocks/backButton.js';

export default class SignupSection extends Section {
  constructor() {
    super();
  }

  render() {
    this.signup = document.createElement('div');
    this.backButton = new BackButton('Menu');
    this.signupForm = new SignupForm();

    this.signup.appendChild(this.backButton.render());
    this.signup.appendChild(this.signupForm.render());

    this.backButton.onClick();

    const submitCallback = (event) => {
      event.preventDefault();

      this.signupForm.checkFormState()
        .then((userData) => UserService.signUp(userData))
        .then((user) => {
          if (!user) {
            this.signupForm.onSubmit(submitCallback);
            Logger.log('Unsuccessful registration');
            return;
          }
          SectionDispatcher.changeSection('Play');
        })
        .catch((err) => {
          this.signupForm.onSubmit(submitCallback);
          Logger.error(err);
          //TODO:Error dispatcher
        });
    };

    this.signupForm.onSubmit(submitCallback);

    return this.signup;
  }
}