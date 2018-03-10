import Button from './button.js';

export default class Paginator {
  constructor() {
  }

  /**
   *
   * @param {Number} curPage
   * @param {Number} pageNum
   * @returns {HTMLDivElement | *}
   */
  render(curPage, pageNum) {
    this.curPage = Number(curPage);
    this.pageNum = Number(pageNum);

    this.paginator = document.createElement('div');
    this.page1 = new Button('button', '1');
    this.prevButton = new Button('button', '<<');
    this.nextButton = new Button('button', '>>');
    this.lastPage = new Button('button', `${this.pageNum}`);
    this.centerButton = new Button('button', '..');

    if (this.pageNum !== 1) {
      switch (this.curPage) {
        case 1:
          this.paginator.appendChild(this.page1.render());
          this.paginator.appendChild(this.centerButton.render());
          this.paginator.appendChild(this.lastPage.render());
          this.paginator.appendChild(this.nextButton.render());
          break;

        case this.pageNum:
          this.paginator.appendChild(this.prevButton.render());
          this.paginator.appendChild(this.page1.render());
          this.paginator.appendChild(this.centerButton.render());
          this.paginator.appendChild(this.lastPage.render());
          break;

        default:
          this.paginator.appendChild(this.prevButton.render());
          this.paginator.appendChild(this.page1.render());
          this.paginator.appendChild(this.centerButton.render());
          this.paginator.appendChild(this.lastPage.render());
          this.paginator.appendChild(this.nextButton.render());
          break;
      }
    }

    return this.paginator;
  }
}