import Button from "../blocks/button.js";
import Section from "./section.js";
import SectionDispatcher from "../../modules/SectionDispatcher.js";


export default class MenuSection extends Section {
	constructor() {
		super();

	}

	render() {
		this.menu = document.createElement("div");

		this.playButton = new Button("button", "Play");
		this.loginButton = new Button("button", "Login");
		this.signupButton = new Button("button", "Signup");

		this.menu.appendChild(this.playButton.render());
		this.menu.appendChild(this.loginButton.render());
		this.menu.appendChild(this.signupButton.render());

		this.playButton.onClick(() => {
			SectionDispatcher.changeSection("Play");
		});

		this.loginButton.onClick(() => {
			SectionDispatcher.changeSection("Login");
		});

		this.signupButton.onClick(() => {
			SectionDispatcher.changeSection("Signup");
		});

		return this.menu;
	}

}
