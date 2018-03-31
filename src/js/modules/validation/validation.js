import {validationErrors} from '../../config/textErrors.js';

export default class Validator {

  /**
   * @param {InputForm} email
   */
  static checkEmail(email) {
    if (!email.getData() || !email.getData().match(/@/)) {
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
   * @param {InputForm} username
   */
  static checkUsername(username) {
    if (!username.getData() ||
      username.getData().length < 3 ||
      username.getData().length > 20) {
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
   * @param {InputForm} password
   */
  static checkPassword(password) {
    if (!password.getData().match(/[\w\d]/) ||
      password.getData().length < 4 || password.getData().length > 30) {
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
   * @param {InputForm} password
   * @param {InputForm} passwordConfirm
   */
  static confirmPassword(password, passwordConfirm) {
    if (password.getData() !== passwordConfirm.getData()) {
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






