import LeaderBoard from '../views/pages/LeaderBoard/leaderBoard.js';
import Menu from '../views/pages/MainMenuView/MainMenuView.js';
import PlaySection from '../views/pages/PlaySection.js';
import SignupSection from '../views/pages/signupSection.js';
import Profile from '../views/pages/ProfileView/Profile.js';
import UpdateUserSection from '../views/pages/UpdateUserSection.js';
import LoginSection from '../views/pages/loginSection.js';

const menuSection = new Menu();
const loginSection = new LoginSection();
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