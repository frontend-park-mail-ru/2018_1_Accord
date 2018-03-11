import PaginationButton from './paginationButton.js';

export default class Paginator {

  constructor() {
    this.curPage = 1;
    this.pageNum = 1;

    this.paginator = document.createElement('div');
    this.firstButton = new PaginationButton('button', '1');
    this.curButton = new PaginationButton('button', `${this.curPage}`);
    this.lastButton = new PaginationButton('button', `${this.pageNum}`);
    this.prevButton = new PaginationButton('button', '<<');
    this.nextButton = new PaginationButton('button', '>>');
    this.centerButton = new PaginationButton('button', '..');
  }

  /**
   *
   * @param {Number} curPage
   * @param {Number} pageNum
   */
  updatePaginator(curPage, pageNum) {
    if (this.curPage === curPage && this.pageNum === pageNum) {
      return;
    }

    while (this.paginator.firstChild) {
      this.paginator.removeChild(this.paginator.firstChild);
    }

    this.curPage = curPage;
    this.pageNum = pageNum;

    this.lastButton.setValue(`${this.pageNum}`);

    if (this.pageNum !== 1) {
      switch (this.curPage) {
        case 1:
          this.paginator.appendChild(this.firstButton.render());
          this.paginator.appendChild(this.centerButton.render());
          this.paginator.appendChild(this.lastButton.render());
          this.paginator.appendChild(this.nextButton.render());
          break;

        case this.pageNum:
          this.paginator.appendChild(this.prevButton.render());
          this.paginator.appendChild(this.firstButton.render());
          this.paginator.appendChild(this.centerButton.render());
          this.paginator.appendChild(this.lastButton.render());
          break;

        default:
          this.curButton.setValue(`${this.curButton}`);

          this.paginator.appendChild(this.prevButton.render());
          this.paginator.appendChild(this.firstButton.render());
          this.paginator.appendChild(this.curButton.render());
          this.paginator.appendChild(this.lastButton.render());
          this.paginator.appendChild(this.nextButton.render());
          break;
      }
    } else {
      this.paginator.appendChild(this.firstButton.render());
    }
  }

  onClick(callback) {
    this.firstButton.onClick(() => {
      callback(1);
    });

    this.prevButton.onClick(() => {
      if (this.curPage > 1) {
        callback(this.curPage - 1);
      }
    });

    this.nextButton.onClick(() => {
      if (this.curPage < this.pageNum) {
        callback(this.curPage + 1);
      }
    });

    this.lastButton.onClick(() => {
      callback(this.pageNum);
    });


    this.curButton.onClick(() => {
      callback(this.curPage);
    });

  }

  /**
   *
   * @returns {HTMLDivElement | *}
   */
  render() {
    return this.paginator;
  }
}