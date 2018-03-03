import HttpService from "./HTTPService_XHR.js";
import APIMethods from "./config.js";

export default function (userData) {
    HttpService.post(APIMethods.login, userData, (response) => {
       console.log(response.json());
    });
}