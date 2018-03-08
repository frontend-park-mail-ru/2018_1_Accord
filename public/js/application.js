"use strict";

import Menu from "./components/pages/mainMenu.js";
import LoginSection from "./components/pages/loginSection.js";
import renderDOM from "./components/render/render.js";
import SignupSection from "./components/pages/signupSection.js";

const menuSection = new Menu();
const loginSection = new LoginSection();
const signupSection = new SignupSection();

export const Sections = {
	"Menu": menuSection,
	"Login": loginSection,
	"Signup": signupSection
};

renderDOM(menuSection.render(), document.getElementById("root"));