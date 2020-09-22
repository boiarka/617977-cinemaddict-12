import AbstractView from "./abstract.js";

const mainNavTemplate = () => {
  return (
    `<nav class="main-navigation">
          <a href="#stats" class="main-navigation__additional" data-menu-type="stat">Stats</a>
        </nav>`
  );
};


export default class SiteNav extends AbstractView {
  constructor() {
    super();

    this._statClickHandler = this._statClickHandler.bind(this);
    this._isStatOpened = false;
  }

  getTemplate() {
    return mainNavTemplate(this._filters, this._currentFilter);
  }

  _statClickHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();

    if (evt.target.dataset.menuType && !this._isStatOpened) {
      this._callback.openStat();
      this._isStatOpened = true;
      return;
    }

    if (evt.target.dataset.filterType && this._isStatOpened) {
      this._callback.closeStat();
      this._isStatOpened = false;
      return;
    }

  }

  setStatClickHandler(callback1, callback2) {
    this._callback.openStat = callback1;
    this._callback.closeStat = callback2;
    this.getElement().addEventListener(`click`, this._statClickHandler);
  }
}
