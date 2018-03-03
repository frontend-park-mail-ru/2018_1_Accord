import Form from "./form.js";
import InputForm from "./input.js";
import Button from "./button.js";
import renderDOM from "../render/render.js"

export default class LoginForm extends Form {
    constructor() {
        super();

        this.Email = new InputForm('text', 'Enter your e-mail...');
        this.Password = new InputForm('password', 'Enter your password...');
        this.ButtonSubmit = new Button('submit', 'Log in');

        //this.username.oninputchange(validate), email  pass...
        renderDOM(this.Email, this.formElement);
        renderDOM(this.Password, this.formElement);
        renderDOM(this.ButtonSubmit, this.formElement);
    }

    render() {
        return this.formElement;
    }

    getFormData() {
        return {
            email: this.Email.getData(),
            password: this.Password.getData()
        }
    }

    onSubmit(callback) {
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            callback();
        });
    }
}