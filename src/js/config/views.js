import LeaderBoard from '../views/pages/LeaderBoard/leaderBoard.js';
import Menu from '../views/pages/MainMenuView/MainMenuView.js';
import PlaySection from '../views/pages/PlaySection.js';
import Profile from '../views/pages/ProfileView/Profile.js';
import LoginView from '../views/pages/LoginView/loginView.js';
import SignUpView from '../views/pages/SignUpView/SignUpView.js';

const menuSection = new Menu();
const loginSection = new LoginView();
const signUpSection = new SignUpView();
const playSection = new PlaySection();
const leaderBoard = new LeaderBoard();
const profileSection = new Profile();

export const Sections = {
  'Menu': menuSection,
  'Login': loginSection,
  'Signup': signUpSection,
  'Play': playSection,
  'LeaderBoard': leaderBoard,
  'Profile': profileSection,
};