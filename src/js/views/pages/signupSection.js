import SignupForm from '../../components/forms/signupForm.js';
import userService from '../../services/UserService.js';
import Logger from '../../utils/logger.js';
import Router from '../../modules/router.js';
import {serverErrors} from '../../config/textErrors.js';

export default class SignupSection  {
  constructor() {
  }

  render() {
    this.signup = document.createElement('div');
    this.signupForm = new SignupForm();
    this.infoField = document.createElement('div');
    this.infoField.style.display = 'none';

    this.signup.appendChild(this.infoField);
    this.signup.appendChild(this.signupForm.render());

    const submitCallback = (event) => {
      event.preventDefault();

      this.signupForm.checkFormState()
        .then((userData) => userService.signUp(userData))
        .then((user) => {
          if (!user) {
            this.signupForm.onSubmit(submitCallback);
            this.infoField.innerHTML = serverErrors.signup;
            this.infoField.style.display = 'block';
            Logger.log('Unsuccessful registration');
            return;
          }
          Router.changeSection('Play');
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