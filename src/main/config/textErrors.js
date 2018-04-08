export const validationErrors = {
  email: 'Invalid e-mail!',
  username: 'Username need to contain 3-20 symbols!',
  password: 'Password contains 4-30 symbols with letters and digits',
  passwordConfirm: 'Password do not match!'
};

export const serverErrors = {
  login: 'Incorrect email or password',
  signup: 'Incorrect email or username',
  updateNotLogin: 'You are not login',
  leaderBoard: 'Something is not ok,\n can not open leader board',
  unexpected: 'Something is not ok'
};

export const fetchFaildErrors = {
  noConnection: 'Something wrong with internet connection'
};
