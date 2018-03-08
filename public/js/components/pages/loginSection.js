import Section from "./section.js";
import LoginForm from "../blocks/loginForm.js";
import {loginUser} from "../../modules/UserService.js";


export default class LoginSection extends Section {
	constructor() {
		super();

	}

	render() {
	    this.login = document.createElement("div");
		this.loginForm = new LoginForm();

		this.login.appendChild(this.loginForm.render());

		this.loginForm.onSubmit(() => {
			if (this.loginForm.checkFormState()) {
				loginUser(this.loginForm.getFormData());
				this.loginForm.reset();
			}
		});

		return this.login;
	}
}
