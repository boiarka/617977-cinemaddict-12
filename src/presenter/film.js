import FilmCardView from "../view/film-card.js";
import FilmPopupView from "../view/film-popup.js";

import {
  render,
  remove,
  replace,
  RenderPosition
} from "../utils/render.js";

export default class Film {
  constructor(mainSection, changeData) {
    this._mainSection = mainSection;
    this._changeData = changeData;

    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);
    this._handlePosterClick = this._handlePosterClick.bind(this);
    this._handlePopupCloseClick = this._handlePopupCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoritesClick = this._handleFavoritesClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;

    this._filmComponent = new FilmCardView(this._film);
    this._filmPopupComponent = new FilmPopupView(this._film);

    this._filmComponent.setPosterClickHandler(this._handlePosterClick);
    this._filmComponent.setTitleClickHandler(this._handleTitleClick);
    this._filmComponent.setCommentsClickHandler(this._handleCommentsClick);

    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoritesClickHandler(this._handleFavoritesClick);

    this._filmPopupComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmPopupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmPopupComponent.setFavoritesClickHandler(this._handleFavoritesClick);

    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this._mainSection, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filmComponent, prevFilmComponent);

    if (this._mainSection.getElement().contains(prevFilmPopupComponent.getElement())) {
      replace(this._filmPopupComponent, prevFilmPopupComponent);
      this._filmPopupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);
      this._filmPopupComponent.setWatchListClickHandler(this._handleWatchListClick);
      this._filmPopupComponent.setWatchedClickHandler(this._handleWatchedClick);
      this._filmPopupComponent.setFavoritesClickHandler(this._handleFavoritesClick);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopupComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopupComponent);
  }

  _openPopup() {
    this._filmPopupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);

    render(this._mainSection, this._filmPopupComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _closePopup() {
    this._filmPopupComponent.getElement().remove();
    this._filmPopupComponent.removeElement();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _handleTitleClick() {
    this._openPopup();
  }

  _handleCommentsClick() {
    this._openPopup();
  }

  _handlePosterClick() {
    this._openPopup();
  }

  _handlePopupCloseClick() {
    this._closePopup();
  }

  _handleWatchListClick() {
    this._changeData(Object.assign({}, this._film, {
      isWatchlist: !this._film.isWatchlist
    }));
  }

  _handleWatchedClick() {
    this._changeData(Object.assign({}, this._film, {
      isWatched: !this._film.isWatched
    }));
  }

  _handleFavoritesClick() {
    this._changeData(Object.assign({}, this._film, {
      isFavorites: !this._film.isFavorites
    }));
  }
}
