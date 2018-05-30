import {validationErrors} from '../../config/textErrors.js';

export default class Validator {

  /**
   * @param {String} email
   */
  static checkEmail(email) {
    if (!email) {
      return {
        state: false,
        errMessage: validationErrors.email
      };
    }
    return {
      state: true,
      errMessage: ''
    };
  }

  /**
   * @param {String} username
   */
  static checkUsername(username) {
    if (!username ||
      username.length < 3 ||
      username.length > 20) {
      return {
        state: false,
        errMessage: validationErrors.username
      };
    }

    return {
      state: true,
      errMessage: ''
    };
  }

  /**
   * @param {String} password
   */
  static checkPassword(password) {
    if (!password.match(/[\w\d]/) ||
      password.length < 4 || password.length > 30) {
      return {
        state: false,
        errMessage: validationErrors.password
      };
    }
    return {
      state: true,
      errMessage: ''
    };
  }

  /**
   * @param {String} password
   * @param {String} passwordConfirm
   */
  static confirmPassword(password, passwordConfirm) {
    if (password !== passwordConfirm) {
      return {
        state: false,
        errMessage: validationErrors.passwordConfirm
      };
    }
    return {
      state: true,
      errMessage: ''
    };
  }
}
