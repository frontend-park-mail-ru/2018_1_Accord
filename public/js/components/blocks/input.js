import Block from "./block.js"

export default class InputForm extends Block{

    constructor(type, placeholder) {
        super();
        this.inputDomElement = document.createElement('input');
        this.inputDomElement.type = type;
        this.inputDomElement.placeholder = placeholder;
    };

    render() {
        return this.inputDomElement;
    };

    getData() {
        return this.inputDomElement.value;
    };

    onInputchange(callback) {
        this.inputDomElement.addEventListener('focus', callback);
        return () => this.inputDomElement.removeEventListener('focus', callback);
    };

}