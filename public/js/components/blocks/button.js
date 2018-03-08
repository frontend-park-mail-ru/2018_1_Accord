import Block from "./block.js";

export default class Button extends Block {
	constructor(type, value) {
		super();
		this.buttonDomElement = document.createElement("button");
		this.buttonDomElement.type = type;
		this.buttonDomElement.innerHTML = value;
	}

	render() {
		return this.buttonDomElement;
	}

	onClick(callback) {
	    this.buttonDomElement.addEventListener("click", (event) => {
			event.preventDefault();
			callback();
		});
	}
}