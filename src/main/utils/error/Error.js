export default class Error {
  /**
   *
   * @param {String} action - logout | login ...
   * @param {Number} code
   */
  constructor(action, code) {
    this.action = action;
    this.code = code;

    this.error = {};

    switch (this.action) {
      case 'Logout':
        switch (this.code) {
          case 400:
            this.error = {status: 'Error', message: 'Unsuccessful logout'};
            break;
          default:
            this.error = {status: 'UnexpError', message: 'Unexpected error'};
            break;
        }
        break;
    }

    return this.error;
  }
}