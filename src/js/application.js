'use strict';

import Menu from './views/pages/mainMenu.js';
import LoginSection from './views/pages/loginSection.js';
//import LoginView from './views/pages/loginView/loginView.js';
//import SignupView from './views/pages/signupView/signupView.js';
import SignupSection from './views/pages/signupSection.js';
import renderDOM from './components/render/render.js';
import PlaySection from './views/pages/PlaySection.js';
import LeaderBoard from './views/pages/leaderboard/leaderBoard.js';
import Profile from './views/pages/Profile.js';
import UpdateUserSection from './views/pages/UpdateUserSection.js';

const menuSection = new Menu();
const loginSection = new LoginSection();
//const loginSection = new LoginView();
//const signUpSection = new SignupView();
const signUpSection = new SignupSection();
const playSection = new PlaySection();
const leaderBoard = new LeaderBoard();
const profileSection = new Profile();
const updateSection = new UpdateUserSection();

export const Sections = {
  'Menu': menuSection,
  'Login': loginSection,
  'Signup': signUpSection,
  'Play': playSection,
  'LeaderBoard': leaderBoard,
  'Profile': profileSection,
  'Update': updateSection
};

renderDOM(menuSection.render(), document.getElementById('root'));