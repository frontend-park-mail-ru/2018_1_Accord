import Section from './section.js';
import SignupForm from '../blocks/signupForm.js';
import UserService from '../../modules/UserService.js';

export default class SignupSection extends Section {
    constructor() {
        super();
    }

    render() {
        this.signup = document.createElement('div');
        this.signupForm = new SignupForm();

        this.signup.appendChild(this.signupForm.render());

        this.signupForm.onSubmit(() => {
            if (this.signupForm.checkFormState()) {
                UserService.signUp(this.signupForm.getFormData());
                this.signupForm.reset();
            }
        });

        return this.signup;
    }
}