import AbstractView from "./abstract.js";

const filmCardTemplate = (film = {}) => {

  const {
    name,
    poster,
    date,
    rating,
    description,
    comments
  } = film;

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${date}</span>
            <span class="film-card__duration">1h 55m</span>
            <span class="film-card__genre">Musical</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();

    this._film = film;
    this._filmClickHandler = this._filmClickHandler.bind(this);
  }

  getTemplate() {
    return filmCardTemplate(this._film);
  }

  _filmClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick();
  }

  setPosterClickHandler(callback) {
    this._callback.posterClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._filmClickHandler);
  }

  setTitleClickHandler(callback) {
    this._callback.posterClick = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._filmClickHandler);
  }

  setCommentsClickHandler(callback) {
    this._callback.posterClick = callback;
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._filmClickHandler);
  }
}
