import Form from "./form.js";
import InputForm from "./input.js";
import Button from "./button.js";
import renderDOM from "../render/render.js"
import Validator from "../validation/validation.js";

export default class LoginForm extends Form {
    constructor() {
        super();

        this.Email = new InputForm('text', 'Enter your e-mail...');
        this.Password = new InputForm('password', 'Enter your password...');
        this.ButtonSubmit = new Button('submit', 'Log in');

        this.Email.onInputChange(this.validateEmail.bind(this));
        this.Password.onInputChange(this.validatePassword.bind(this));

        this.renderAll();
    }

    getFormData() {
        return {
            email: this.Email.getData(),
            password: this.Password.getData()
        }
    }

    render() {
        return this.formElement;
    }

    renderAll() {
        renderDOM(this.Email, this.formElement);
        renderDOM(this.Password, this.formElement);
        renderDOM(this.ButtonSubmit, this.formElement);
    }

    onSubmit(callback) {
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            callback();
        });
    }

    checkFormState() {
        return this.Email.getState() && this.Password.getState();
    }

    validateEmail() {
        const formState = Validator.checkEmail(this.Email);

        this.Email.setError(formState.errMessage);
    }

    validatePassword() {
        const formState = Validator.checkPassword(this.Password);

        this.Password.setError(formState.errMessage);
    }
}