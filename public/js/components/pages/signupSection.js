import Section from "./section.js";
import SignupForm from "../blocks/signupForm.js";
import {signupUser} from "../../modules/UserService.js";

export default class SignupSection extends Section {
	constructor() {
		super();
	}

	render() {
		this.signup = document.createElement("div");
		this.signupForm = new SignupForm();

		this.signup.appendChild(this.signupForm.render());

		this.signupForm.onSubmit(() => {
			if (this.signupForm.checkFormState()) {
				signupUser(this.signupForm.getFormData());
				this.signupForm.reset();
			}
		});

		return this.signup;
	}
}