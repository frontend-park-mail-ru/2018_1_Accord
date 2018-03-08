import HttpService from "./HTTPService_XHR.js";
import config from "./config.js";

export function loginUser(userData) {
	HttpService.post(config.APIMethods.login, userData, (response) => {
		console.log(response.json());
	});
}

export function signupUser(userData) {
	HttpService.post(config.APIMethods.signup, userData, (response) => {
		console.log(response.json());
	});
}

export function loadUser() {
	HttpService.get(config.APIMethods.user, (response) => {
		console.log(response.json());
	});
}