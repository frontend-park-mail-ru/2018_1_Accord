import HttpService from "./HTTPService_XHR.js";
import APIMethods from "./config.js";

export function loginUser(userData) {
    HttpService.post(APIMethods.login, userData, (response) => {
        console.log(response.json());
    });
}

export function signupUser(userData) {
    HttpService.post(APIMethods.signup, userData, (response) => {
        console.log(response.json());
    });
}

export function loadUser() {
    HttpService.get(APIMethods.user, (response) => {
        console.log(response.json());
    });
}