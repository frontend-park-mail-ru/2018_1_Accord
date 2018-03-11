import Block from '../blocks/block.js';

export default class Form extends Block {
  constructor() {
    super();
    this.formElement = document.createElement('form');

  }

  render() {
  }

  reset() {
    this.formElement.reset();
  }

  onSubmit() {
  }

}