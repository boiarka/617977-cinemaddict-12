import {
  createElement
} from "../utils.js";

const FILTERS = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

const FILTERS_LABELS = {
  [FILTERS.ALL]: `All movies`,
  [FILTERS.WATCHLIST]: `Watchlist`,
  [FILTERS.HISTORY]: `History`,
  [FILTERS.FAVORITES]: `Favorites`,
};


const createNavItemTemplate = (filter, isActive) => {
  const {
    name,
    count
  } = filter;

  return `<a 
  href="#${name}" 
  class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
  ${FILTERS_LABELS[name]}
  ${name === FILTERS.ALL ? `` : `<span class="main-navigation__item-count">${count}</span>`}
  </a>`;
};

const mainNavTemplate = (filterItems) => {
  const navItemsTemplate = filterItems
    .map((filter, index) => createNavItemTemplate(filter, index === 0))
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


export default class SiteNav {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return mainNavTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
