import {loginUser, signupUser, loadUser} from "../js/modules/UserService.js";
import Button from "../js/components/blocks/button.js";
import SignupForm from "../js/components/blocks/signupForm.js";
import LoginForm from "../js/components/blocks/loginForm.js";
import renderDOM from "../js/components/render/render.js";


const loginForm = new LoginForm();
const signupForm = new SignupForm();
const loadUserButton = new Button("submit", "Load User");

renderDOM(loginForm, document.getElementById("root"));
renderDOM(signupForm, document.getElementById("root"));
renderDOM(loadUserButton, document.getElementById("root"));

function loginUserCallback() {
	if (loginForm.checkFormState()) {
		loginUser(loginForm.getFormData());
		loginForm.reset();
	}
}

function signupUserCallback() {
	if (signupForm.checkFormState()){
		signupUser(signupForm.getFormData());
		signupForm.reset();
	}
}

loginForm.onSubmit(loginUserCallback);
signupForm.onSubmit(signupUserCallback);
loadUserButton.onClick(loadUser);

