import FetchService from './FetchService.js';
import config from '../config/config.js';
import User from '../models/User.js';
import {errorTransformer} from '../utils/httpServiceHelpers.js';
import Error from '../error/Error.js';


class UserService {
  constructor() {
    this.user = this.load();
  }

  /**
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
     * @returns {Promise<User | undefined>}
     */
  load() {
    return FetchService.get(config.APIMethods.user)
      .then(UserService.responseDispatcher)
      .then((json) => {
        if (json) {
          return new User(json);
        }
      })
      .catch(errorTransformer);
  }

  /**
     *
     * @param {Object} userData
     * @returns {Promise<User | undefined>}
     */
  login(userData) {
    this.user = FetchService.post(config.APIMethods.login, JSON.stringify(userData))
      .then(UserService.responseDispatcher)
      .then((json) => {
        if (json) {
          return new User(json);
        }
      })
      .catch(errorTransformer);

    return this.user;
  }

  /**
     *
     * @param {Object} userData
     * @returns {Promise<User | undefined>}
     */
  signUp(userData) {
    this.user = FetchService.post(config.APIMethods.signup, JSON.stringify(userData))
      .then(UserService.responseDispatcher)
      .then((json) => {
        if (json) {
          return new User(json);
        }
      })
      .catch(errorTransformer);

    return this.user;
  }

  /**
   *
   * @param {Object} userData
   * @returns {Promise<Response>}
   */
  update(userData) {
    return FetchService.put(config.APIMethods.updateUser, JSON.stringify(userData))
      .then((response) => {
        switch (response.status) {
          case 200:
            this.user = Promise.resolve();
            return true;
          case 400:
            throw {status: 'Error', message: 'Unsuccessful update'};
          case 401:
            return;
          default:
            throw {status: 'Error', message: 'Unexpected error'};
        }
      })
      .catch(errorTransformer);
  }

  /**
     *
     * @returns {Promise<Response>}
     */
  logout() {
    return FetchService.delete(config.APIMethods.logout)
      .then((response) => {
        switch (response.status) {
          case 200:
            this.user = Promise.resolve();
            return true;
          case 400:
            throw new Error('Logout', 400);
          default:
            throw new Error('Logout', 0);

        }
      })
      .catch(errorTransformer);
  }

  getUser() {
    return this.user;
  }
}

const userService = new UserService();
export default userService;

