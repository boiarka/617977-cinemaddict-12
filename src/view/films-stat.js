import {
  createElement
} from "../utils.js";

const filmsStatisticTemplate = (filmsCount) => {
  return (
    `<p>${filmsCount} movies inside</p>`
  );
};

export default class FilmsStat {
  constructor(count) {
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return filmsStatisticTemplate(this._count);
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
