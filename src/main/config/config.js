const serverUrl = 'https://backend-accord-02-2018.herokuapp.com';

const APIMethods = {
  login: '/login',
  signup: '/register',
  logout: '/logout',
  user: '/getUser',
  updateUser: '/updateUser',
  leaderBoard: '/scoreboard',
};

export const config = {
  debug: true
};

export default {APIMethods, serverUrl};