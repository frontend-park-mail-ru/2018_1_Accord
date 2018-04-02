export default class TextField {
  /**
	 *
     * @param {String} text
     */
  constructor(text) {
    super();

    this.textElement = document.createElement('div');
    this.textElement.innerHTML = text;
  }

  render() {
    return this.textElement;
  }

}