import moment from "moment";

import SmartView from "./smart.js";

import {
  commentDate,
  getFilmDuration
} from "../utils/film.js";


const createCommentTemplate = (commentObj) => {
  const {
    id,
    author,
    date,
    comment,
    emotion,
  } = commentObj;

  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDate(date)}</span>
        <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
      </p>
    </div>
  </li>`
  );
};

const createAddCommentTemplate = () => {

  return (
    `<div for="add-emoji" class="film-details__add-emoji-label"></div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>

    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>
    </div>`
  );
};


const filmPopupTemplate = (film, comments) => {
  const {
    film_info: {
      title,
      poster,
      description,
      director,
      writers,
      actors,
      runtime,
      genre,
      release: {
        date,
      }
    },
  } = film;

  const isWatchlist = film.user_details.watchlist;
  const isWatched = film.user_details.already_watched;
  const isFavorites = film.user_details.favorite;
  const totalRating = film.film_info.total_rating;
  const alternativeTitle = film.film_info.alternative_title;
  const ageRating = film.film_info.age_rating;
  const releaseCountry = film.film_info.release.release_country;
  const filmDuration = getFilmDuration(runtime);
  const filmDate = moment(date).format(`MMM Do YYYY`);

  let filmGenres = ``;
  genre.forEach((oneGenre) => {
    filmGenres += `<span class="film-details__genre">${oneGenre}</span>`;
  });


  let commentsTemplate = ``;
  for (let i = 0; i < comments.length; i++) {
    commentsTemplate += createCommentTemplate(comments[i]);
  }
  const commentsCount = comments.length;

  const addCommentsTemplate = createAddCommentTemplate();

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${filmDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${filmDuration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genre${genre.length === 1 ? `` : `s`}</td>
              <td class="film-details__cell">${filmGenres}</td>
            </tr>
          </table>

          <p class="film-details__film-description">
          ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorites ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

        <ul class="film-details__comments-list">
          ${commentsTemplate}
        </ul>

        <div class="film-details__new-comment">
          ${addCommentsTemplate}
        </div>
      </section>
    </div>
  </form>
</section>`;
};


export default class FilmPopup extends SmartView {
  constructor(film, comments) {
    super();

    this._film = film;
    this._comments = comments;
    this._popupCloseClickHandler = this._popupCloseClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);

    this._commentEmoji = null;
    this._commentText = null;
    this._emojiHandler();
  }

  getTemplate() {
    return filmPopupTemplate(this._film, this._comments);
  }

  _emojiHandler() {
    const emojiInputs = this.getElement().querySelectorAll(`.film-details__emoji-list input`);
    this._commentEmoji = this.getElement().querySelector(`.film-details__add-emoji-label`);
    this._commentText = this.getElement().querySelector(`.film-details__comment-input`);

    emojiInputs.forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        this._commentEmoji.innerHTML = `<img src="images/emoji/${evt.target.value}.png" width="55" height="55" alt="${evt.target.id}" data-emoji-name="${evt.target.value}">`;
        this._commentEmojiId = evt.target.id;
      });
    });
  }

  _popupCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.popupCloseClick();
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

  setPopupCloseClickHandler(callback) {
    this._callback.popupCloseClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._popupCloseClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, this._watchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`#watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favoritesClick = callback;
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, this._favoritesClickHandler);
  }

}
