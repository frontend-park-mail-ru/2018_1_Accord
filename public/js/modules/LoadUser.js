import HttpService from "./HTTPService_XHR.js";
import APIMethods from "./config.js";

export default function () {
    HttpService.get(APIMethods.user, (response) => {
        console.log(response.json());
    });
}