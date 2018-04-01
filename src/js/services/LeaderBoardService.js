import http from './FetchService.js';
import config from '../config/config.js';
import {errorTransformer} from '../utils/httpServiceHelpers.js';

class LeaderBoardService {
  constructor() {
  }

  /**
   *
   * @param page
   * @returns {Promise<Response> | *}
   */
  getLeaderBoard(page) {
    page = page || 1;

    const path = `${config.APIMethods.leaderBoard}/${page}`;
    this.dataPromise = http.get(path)
      .then((response) => {
        switch (response.status) {
          case 200:
            this.curPage = page;
            return response.json();
          case 400:
            throw {status: 'Error', message: 'Unsuccessful try'};
          default:
            throw {status: 'Error', message: 'Unexpected error'};
        }
      })
      .then((json) => {
        if (json) {
          return {
            curPage: Number(json.currentPage),
            pageNum: Number(json.numberOfPages),
            data: json.scoreBoard
          };
        }
      })
      .catch(errorTransformer);

    return this.dataPromise;
  }
}

const leaderBoardService = new LeaderBoardService();
export default leaderBoardService;
