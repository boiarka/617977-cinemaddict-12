import AbstractView from "./abstract.js";
import {
  FilterType
} from "../const.js";


const FILTERS_LABELS = {
  [FilterType.ALL]: `All movies`,
  [FilterType.WATCHLIST]: `Watchlist`,
  [FilterType.HISTORY]: `History`,
  [FilterType.FAVORITES]: `Favorites`,
};


const createNavItemTemplate = (filter, currentFilterType) => {
  const {
    type,
    name,
    count
  } = filter;

  return `<a 
  href="#${name}" 
  class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}"
  data-filter-type="${type}">
  ${FILTERS_LABELS[type]}
  ${name === FilterType.ALL ? `` : `<span class="main-navigation__item-count">${count}</span>`}
  </a>`;
};

const mainNavTemplate = (filterItems, currentFilterType) => {
  const navItemsTemplate = filterItems
    .map((filter) => createNavItemTemplate(filter, currentFilterType))
    .join(``);

  return (
    `<nav class="main-navigation">
          <div class="main-navigation__items">
            ${navItemsTemplate}
          </div>
          <a href="#stats" class="main-navigation__additional">Stats</a>
        </nav>`
  );
};


export default class SiteNav extends AbstractView {
  constructor(filters, currentFilterType) {
    super();

    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return mainNavTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
