import Form from "./form.js";
import InputForm from "./input.js";
import Button from "./button.js";
import renderDOM from "../render/render.js";

export default class signupForm extends Form {
    constructor() {
        super();

        this.Email = new InputForm('email', 'Enter your e-mail...');
        this.Username = new InputForm('text', 'Enter username...');
        this.Password = new InputForm('password', 'Enter your password...');
        this.PasswordConfirm = new InputForm('password', 'Confirm password...');
        this.ButtonSubmit = new Button('submit', 'Sign up');

        //validation

        renderDOM(this.Email, this.formElement);
        renderDOM(this.Username, this.formElement);
        renderDOM(this.Password, this.formElement);
        renderDOM(this.PasswordConfirm, this.formElement);
        renderDOM(this.ButtonSubmit, this.formElement);
    }


    render() {
        return this.formElement;
    }

    getFormData() {
        return {
            email: this.Email.getData(),
            password: this.Password.getData(),
            nickname: this.Username.getData()
        }
    }

    onSubmit(callback) {
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            callback();
        });
    }
}