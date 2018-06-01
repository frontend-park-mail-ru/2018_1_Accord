const serverUrl = 'https://донуц.рф';

const APIMethods = {
  login: '/api/login',
  signup: '/api/register',
  logout: '/api/logout',
  user: '/api/getUser',
  updateUser: '/api/updateUser',
  leaderBoard: '/api/scoreboard',
};

export const config = {
  debug: false
};

export default {APIMethods, serverUrl};
