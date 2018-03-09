import http from './FetchService.js';
import config from './config.js';
import User from './User.js';


class UserService {
    constructor() {
        this.user = this.load();
    }

    /**
     * @private
     * @returns {Promise<User | undefined>}
     */
    load() {
        return http.get(config.APIMethods.user)
            .then(this.responseDispatcher)
            .then((json) => {
                if (json) {
                    return new User(json);
                }
            })
            .catch(this.errorTransformer);
    }

    /**
     *
     * @param {Object} userData
     * @returns {Promise<User | undefined>}
     */
    login(userData) {
        this.user = http.post(config.APIMethods.login, JSON.stringify(userData))
            .then(this.responseDispatcher)
            .then((json) => {
                if (json) {
                    return new User(json);
                }
            })
            .catch(this.errorTransformer);

        return this.user;
    }

    /**
     *
     * @param {Object} userData
     * @returns {Promise<User | undefined>}
     */
    signUp(userData) {
        this.user = http.post(config.APIMethods.signup, JSON.stringify(userData))
            .then(this.responseDispatcher)
            .then((json) => {
                if (json) {
                    return new User(json);
                }
            })
            .catch(this.errorTransformer);

        return this.user;
    }

    /**
     *
     * @returns {Promise<Response>}
     */
    logout() {
        this.user = new Promise.resolve();
        return http.get(config.APIMethods.logout)
            .then((response) => {
                switch (response.status) {
                    case 200:
                        return true;
                    case 400:
                        throw {status: 'Error', message: 'Unsuccessful logout'};
                    default:
                        throw {status: 'Error', message: 'Unexpected error'};

                }
            })
            .catch(this.errorTransformer);
    }

    /**
     * @private
     * @param {Response} response
     * @returns {*|{jsonchars, jsonchars_test, jsonhash, replaceJSON, escapeJSON}|JSON|Promise<any>}
     */
    responseDispatcher(response) {
        switch (response.status) {
            case 200:
                return response.json();
            case 401:
                return;
            default:
                throw {status: 'Error', message: 'Unexpected error'};
        }
    }

    /**
     * @private
     * @param {String|Object} error
     */
    errorTransformer(error) {
        if (typeof error === 'string') {
            throw {status: 'Error', message: error};
        }
        throw error;
    }


    getUser() {
        return this.user;
    }

    //
    // checkAuth() {
    //     return this.user.getStatus();
    // }
    //
    // login(userData) {
    //     HttpService.post(config.APIMethods.login, userData, (response) => {
    //         this.user.changeStatus(response.json());
    //         console.log(response.json());
    //     });
    // }
    //
    // signUp(userData) {
    //     HttpService.post(config.APIMethods.signUp, userData, (response) => {
    //         console.log(response.json());
    //     });
    // }
    //
    // load() {
    //     HttpService.get(config.APIMethods.user, (response) => {
    //         this.user.changeStatus(response.json());
    //         console.log(response.json());
    //     });
    // }
    //
    // logout() {
    //     HttpService.post(config.APIMethods.logout, (response) => {
    //         console.log(response.json());
    //     });
    // }
}

const Us = new UserService();

export default Us;

