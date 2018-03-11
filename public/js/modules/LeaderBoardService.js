import http from './FetchService.js';
import config from '../config/config.js';
import Logger from '../utils/logger.js';
import {errorTransformer} from '../utils/httpServiceHelpers.js';

export default class LeaderBoardService {

  /**
   *
   * @param {Number} page
   * @returns {Promise<Response> | *}
   */
  static getLeaderBoard(page) {
    const path = config.APIMethods.leaderBoard + `/${page}`;
    Logger.log(path);
    this.LBJson = http.get(path)
      .then((response) => {
        switch (response.status) {
          case 200:
            return response.json();
          case 400:
            return;
          default:
            throw {status: 'Error', message: 'Unexpected error'};
        }
      })
      .then((json) => {
        if (json) {
          return json;
        }
      })
      .catch(errorTransformer);

    return this.LBJson;
  }

}