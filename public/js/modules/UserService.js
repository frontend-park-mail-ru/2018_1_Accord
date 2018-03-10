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
      .then(UserService.responseDispatcher)
      .then((json) => {
        if (json) {
          return new User(json);
        }
      })
      .catch(UserService.errorTransformer);
  }

  /**
     *
     * @param {Object} userData
     * @returns {Promise<User | undefined>}
     */
  login(userData) {
    this.user = http.post(config.APIMethods.login, JSON.stringify(userData))
      .then(UserService.responseDispatcher)
      .then((json) => {
        if (json) {
          return new User(json);
        }
      })
      .catch(UserService.errorTransformer);

    return this.user;
  }

  /**
     *
     * @param {Object} userData
     * @returns {Promise<User | undefined>}
     */
  signUp(userData) {
    this.user = http.post(config.APIMethods.signup, JSON.stringify(userData))
      .then(UserService.responseDispatcher)
      .then((json) => {
        if (json) {
          return new User(json);
        }
      })
      .catch(UserService.errorTransformer);

    return this.user;
  }

  /**
     *
     * @returns {Promise<Response>}
     */
  logout() {
    return http.delete(config.APIMethods.logout)
      .then((response) => {
        switch (response.status) {
          case 200:
            this.user = Promise.resolve();
            return true;
          case 400:
            throw {status: 'Error', message: 'Unsuccessful logout'};
          default:
            throw {status: 'Error', message: 'Unexpected error'};

        }
      })
      .catch(UserService.errorTransformer);
  }

  /**
     * @private
     * @param {Response} response
     * @returns {*|{jsonchars, jsonchars_test, jsonhash, replaceJSON, escapeJSON}|JSON|Promise<any>}
     */
  static responseDispatcher(response) {
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
  static errorTransformer(error) {
    if (typeof error === 'string') {
      throw {status: 'Error', message: error};
    }
    throw error;
  }


  getUser() {
    return this.user;
  }
}

const Us = new UserService();
export default Us;

