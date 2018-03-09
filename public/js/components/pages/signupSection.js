import Section from './section.js';
import SignupForm from '../blocks/signupForm.js';
import UserService from '../../modules/UserService.js';
import Logger from '../../modules/logger.js';
import SectionDispatcher from '../../modules/SectionDispatcher.js';

export default class SignupSection extends Section {
    constructor() {
        super();
    }

    render() {
        this.signup = document.createElement('div');
        this.signupForm = new SignupForm();

        this.signup.appendChild(this.signupForm.render());

        const submitCallback = () => {
            Logger.log(1);
            this.remover();
            const temporalRemover = this.signupForm.onSubmit(()=>{});

            if (this.signupForm.checkFormState()) {
                UserService.signUp(this.signupForm.getFormData())
                    .then((user) => {
                        if (!user) {
                            temporalRemover();
                            this.remover = this.signupForm.onSubmit(submitCallback);
                            Logger.log('Unsuccessful registration');
                            return;
                        }
                        SectionDispatcher.changeSection('Menu');
                    });
                this.signupForm.reset();
            }
        };

        this.remover = this.signupForm.onSubmit(submitCallback);

        return this.signup;
    }
}