import he from "he";
import moment from "moment";

import FilmCardView from "../view/film-card.js";
import FilmPopupView from "../view/film-popup.js";

import {
  render,
  remove,
  replace,
  RenderPosition
} from "../utils/render.js";

import {
  UserAction,
  UpdateType
} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

export default class Film {
  constructor(mainSection, changeData, popupSection, changeMode, commentsModel, api) {
    this._mainSection = mainSection;
    this._popupSection = popupSection;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._commentsModel = commentsModel;
    this._api = api;

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

    this._handleWatchListPopupClick = this._handleWatchListPopupClick.bind(this);
    this._handleWatchedPopupClick = this._handleWatchedPopupClick.bind(this);
    this._handleFavoritesPopupClick = this._handleFavoritesPopupClick.bind(this);
  }

  init(film) {
    this._film = film;

    this._api.getComment(this._film.id)
      .then((comments) => {
        this._comments = comments;

        const prevFilmComponent = this._filmComponent;

        this._filmComponent = new FilmCardView(this._film, this._comments);


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
      });


  }

  destroy() {
    remove(this._filmComponent);
    if (this._filmPopupComponent) {
      remove(this._filmPopupComponent);
    }
  }

  getMode() {
    return this._mode;
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
    this._filmPopupComponent = new FilmPopupView(this._film, this._comments);
    render(this._popupSection, this._filmPopupComponent, RenderPosition.BEFOREEND);

    this._filmPopupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);
    this._filmPopupComponent.setWatchListClickHandler(this._handleWatchListPopupClick);
    this._filmPopupComponent.setWatchedClickHandler(this._handleWatchedPopupClick);
    this._filmPopupComponent.setFavoritesClickHandler(this._handleFavoritesPopupClick);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
    document.addEventListener(`keydown`, this._ctrEnterDownHandler);

    this._handleDeleteComment();
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
      this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, this._film);
    }
  }

  _ctrEnterDownHandler(evt) {
    if ((evt.metaKey || evt.ctrlKey) && evt.keyCode === 13) {
      evt.preventDefault();
      this._handleAddComment();
    }
  }

  _handleDeleteComment() {
    const commentDeleteButtons = this._filmPopupComponent.getElement().querySelectorAll(`.film-details__comment-delete`);
    commentDeleteButtons.forEach((comment) => {
      comment.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        if (this._comments.length > 0) {

          const commentId = evt.target.dataset.commentId;
          this._api.deleteComment(commentId).then(() => {
            this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, this._film);
          });

        }
      });
    });
  }

  _handleAddComment() {
    const commentEmoji = this._filmPopupComponent.getElement().querySelector(`.film-details__add-emoji-label img`);
    const commentText = this._filmPopupComponent.getElement().querySelector(`.film-details__comment-input`);

    if (commentText.value === ``) {
      return;
    }

    if (commentEmoji === null) {
      return;
    }

    const comment = {
      "comment": he.encode(commentText.value),
      "date": moment(new Date()).format(),
      "emotion": commentEmoji.dataset.emojiName
    };

    this._api.addComment(this._film.id, comment).then(() => {
      this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, this._film);
    });

    this._handleDeleteComment();
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
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, this._film);
  }

  _handleWatchListClick() {
    this._film.user_details.watchlist = !this._film.user_details.watchlist;
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, this._film);
  }

  // Вот было:
  //
  // _handleWatchListClick() {
  //   this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, Object.assign({}, this._film, {
  //     isWatchlist: !this._film.isWatchlist
  //   }));
  // }


  _handleWatchedClick() {
    this._film.user_details[`already_watched`] = !this._film.user_details.already_watched;
    this._film.user_details[`watching_date`] = moment(new Date()).format();
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, this._film);
  }

  _handleFavoritesClick() {
    this._film.user_details.favorite = !this._film.user_details.favorite;
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, this._film);
  }

  _handleWatchListPopupClick() {
    this._film.user_details.watchlist = !this._film.user_details.watchlist;
    this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, this._film);
  }

  _handleWatchedPopupClick() {
    this._film.user_details[`already_watched`] = !this._film.user_details.already_watched;
    this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, this._film);
  }

  _handleFavoritesPopupClick() {
    this._film.user_details.favorite = !this._film.user_details.favorite;
    this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, this._film);
  }
}
