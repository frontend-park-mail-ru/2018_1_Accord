const serverUrl = 'https://backend-accord-02-2018.herokuapp.com';

const APIMethods = {
  login: '/login',
  signup: '/register',
  logout: '/logout',
  user: '/getUser',
  userUpdate: '/updateUser'
};

export const config = {
  debug: true
};

export default {APIMethods, serverUrl};