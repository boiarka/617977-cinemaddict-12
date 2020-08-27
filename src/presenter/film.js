import FilmCardView from "../view/film-card.js";
import FilmPopupView from "../view/film-popup.js";

import {
  render,
  remove,
  replace,
  RenderPosition
} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

export default class Film {
  constructor(mainSection, changeData, popupSection, changeMode) {
    this._mainSection = mainSection;
    this._popupSection = popupSection;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._filmPopupComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);
    this._handlePosterClick = this._handlePosterClick.bind(this);
    this._handlePopupCloseClick = this._handlePopupCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleAddComment = this._handleAddComment.bind(this);
    this._ctrEnterDownHandler = this._ctrEnterDownHandler.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoritesClick = this._handleFavoritesClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;

    this._filmComponent = new FilmCardView(this._film);
    this._setFilmHandlers();

    if (prevFilmComponent === null) {
      render(this._mainSection, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmPopupComponent) {
      this._updatePopup();
    }

    replace(this._filmComponent, prevFilmComponent);
    remove(prevFilmComponent);
  }

  destroy() {
    remove(this._filmComponent);
    if (this._filmPopupComponent) {
      remove(this._filmPopupComponent);
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _setFilmHandlers() {
    this._filmComponent.setPosterClickHandler(this._handlePosterClick);
    this._filmComponent.setTitleClickHandler(this._handleTitleClick);
    this._filmComponent.setCommentsClickHandler(this._handleCommentsClick);

    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoritesClickHandler(this._handleFavoritesClick);
  }

  _updatePopup() {
    this._closePopup();
    this._openPopup();
  }

  _openPopup() {
    this._filmPopupComponent = new FilmPopupView(this._film);
    render(this._popupSection, this._filmPopupComponent, RenderPosition.BEFOREEND);

    this._filmPopupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);
    this._filmPopupComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmPopupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmPopupComponent.setFavoritesClickHandler(this._handleFavoritesClick);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    document.addEventListener(`keydown`, this._ctrEnterDownHandler);

    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _closePopup() {
    this._filmPopupComponent.getElement().remove();
    this._filmPopupComponent.removeElement();
    this._filmPopupComponent = null;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    document.removeEventListener(`keydown`, this._ctrEnterDownHandler);

    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _ctrEnterDownHandler(evt) {
    if (evt.key === `Control` || evt.key === `Enter`) {
      evt.preventDefault();
      this._handleAddComment();
    }
  }

  _handleAddComment() {
    this._filmPopupComponent.setAddCommentHandler();
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
