import AbstractView from "./abstract.js";

const filmsStatisticTemplate = (filmsCount) => {
  return (
    `<p>${filmsCount} movies inside</p>`
  );
};

export default class FilmsStat extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return filmsStatisticTemplate(this._count);
  }
}
