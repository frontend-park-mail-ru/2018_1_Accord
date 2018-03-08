export default class User {

	/**
     *
     * @param {Object} userData
     */
	constructor(userData) {
		if (userData.status === "Error") {
		    this.status = "Error";

		}
		this.email = userData.email;
		this.username = userData.nickname;
		this.rating = userData.rating;

	}
}