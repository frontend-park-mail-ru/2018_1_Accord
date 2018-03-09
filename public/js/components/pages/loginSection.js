import Section from './section.js';
import LoginForm from '../blocks/loginForm.js';
import UserService from '../../modules/UserService.js';
import Logger from '../../modules/logger.js';
import SectionDispatcher from '../../modules/SectionDispatcher.js';


export default class LoginSection extends Section {
    constructor() {
        super();

    }

    render() {
        this.login = document.createElement('div');
        this.loginForm = new LoginForm();

        this.login.appendChild(this.loginForm.render());

        this.loginForm.onSubmit(() => {
            if (this.loginForm.checkFormState()) {
                UserService.login(this.loginForm.getFormData())
                    .then((user) => {
                        if (!user) {
                            Logger.log('Unsuccessful login');
                            return;
                        }
                        SectionDispatcher.changeSection('Menu');

                    });
                this.loginForm.reset();
            }
        });

        return this.login;
    }
}
