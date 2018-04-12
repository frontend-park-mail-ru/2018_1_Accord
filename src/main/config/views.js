import LeaderBoard from '../views/pages/LeaderBoard/LeaderBoardView.js';
import Menu from '../views/pages/MainMenuView/MainMenuView.js';
import Profile from '../views/pages/ProfileView/Profile.js';
import LoginView from '../views/pages/LoginView/LoginView.js';
import SignUpView from '../views/pages/SignUpView/SignUpView.js';
import GameView from '../views/pages/GameView/GameView.js';
import HelpView from '../views/pages/HelpView/HelpView.js';

const menuView = new Menu();
const loginView = new LoginView();
const signUpView = new SignUpView();
const playView = new GameView();
const leaderBoard = new LeaderBoard();
const profileView = new Profile();
const helpView = new HelpView();

export const Sections = {
  'Menu': menuView,
  'Login': loginView,
  'Signup': signUpView,
  'Play': playView,
  'LeaderBoard': leaderBoard,
  'Profile': profileView,
  'Help': helpView
};