import moment from "moment";

import AbstractView from "./abstract.js";

import {
  getFilmDuration
} from "../utils/film.js";

const filmCardTemplate = (film = {}) => {
  const totalRating = film.film_info.total_rating;

  const {
    comments,
    film_info: {
      title,
      poster,
      description,
      runtime,
      release: {
        date,
      }
    },
    user_details: {
      watchlist,
      favorite
    }
  } = film;

  const isWatchlist = watchlist;
  const isFavorites = favorite;
  const isWatched = film.user_details.already_watched;
  const filmDate = moment(date).year();
  const filmDuration = getFilmDuration(runtime);

  const filmDescription = description.length > 140 ? description.slice(0, 139) + `...` : description;

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${filmDate}</span>
            <span class="film-card__duration">${filmDuration}</span>
            <span class="film-card__genre">Musical</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${filmDescription}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${isWatchlist ? ` film-card__controls-item--active` : ``}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${isWatched ? ` film-card__controls-item--active` : ``}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite${isFavorites ? ` film-card__controls-item--active` : ``}">Mark as favorite</button>
          </form>
        </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(film, comments) {
    super();

    this._film = film;
    this._comments = comments;
    this._filmClickHandler = this._filmClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
  }

  getTemplate() {
    return filmCardTemplate(this._film, this._comments);
  }

  _filmClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoritesClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoritesClick();
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

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favoritesClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoritesClickHandler);
  }
}
