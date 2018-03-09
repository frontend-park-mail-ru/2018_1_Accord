import Block from './block.js';

export default class TextField extends Block{
    /**
	 *
     * @param {String} text
     */
    constructor(text){
        super();

        this.textElement = document.createElement('div');
        this.textElement.innerHTML = text;
    }

    render() {
        return this.textElement;
    }

    onClick(callback) {
        this.textElement.addEventListener('click', (event) => {
            event.preventDefault();
            callback();
        });
    }
}