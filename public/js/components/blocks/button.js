import Block from "./block.js";

export default class Button extends Block {
    constructor(type, value) {
        super();
        this.buttonDomElement = document.createElement('button');
        this.buttonDomElement.type = type;
        this.buttonDomElement.innerHTML = value;
    }

    render() {
        return this.buttonDomElement;
    }

    onSubmit(callback) {
        this.buttonDomElement.addEventListener('submit', (event) => {
            event.preventDefault();
            callback();
        });
    }
}