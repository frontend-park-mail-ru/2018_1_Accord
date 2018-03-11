'use strict';

import Menu from './components/pages/mainMenu.js';
import LoginSection from './components/pages/loginSection.js';
import renderDOM from './components/render/render.js';
import SignupSection from './components/pages/signupSection.js';
import PlaySection from './components/pages/PlaySection.js';
import LeaderBoard from './components/pages/leaderboard/leaderBoard.js';
import Profile from './components/pages/Profile.js';

const menuSection = new Menu();
const loginSection = new LoginSection();
const signUpSection = new SignupSection();
const playSection = new PlaySection();
const leaderBoard = new LeaderBoard();
const profileSection = new Profile();

export const Sections = {
  'Menu': menuSection,
  'Login': loginSection,
  'Signup': signUpSection,
  'Play': playSection,
  'LeaderBoard': leaderBoard,
  'Profile': profileSection
};

renderDOM(menuSection.render(), document.getElementById('root'));