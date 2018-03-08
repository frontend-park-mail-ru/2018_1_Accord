const serverUrl = "https://backend-accord-02-2018.herokuapp.com";

const APIMethods = {
	login: "/login",
	signup: "/register",
	logout: "/logout",
	user: "/getUser",
	userUpdate: "/updateUser"
};

export default {APIMethods, serverUrl};