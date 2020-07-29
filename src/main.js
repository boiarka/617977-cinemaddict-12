"use srtict";

const FILM_COUNT = 5;

const userProfileTemplae = () => {
  return (
    `<section class="header__profile profile">
        <p class="profile__rating">Movie Buff</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
  );
};

const mainNavTemplate = () => {
  return (
    `<nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
          <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
          <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
          <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
  );
};

const sortTemplate = () => {
  return (
    `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" class="sort__button">Sort by date</a></li>
        <li><a href="#" class="sort__button">Sort by rating</a></li>
      </ul>`
  );
};

const filmsSectionTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
      </div>
      </section>`
  );
};

const filmCardTemplate = () => {
  return (
    `<article class="film-card">
        <h3 class="film-card__title">The Dance of Life</h3>
        <p class="film-card__rating">8.3</p>
        <p class="film-card__info">
          <span class="film-card__year">1929</span>
          <span class="film-card__duration">1h 55m</span>
          <span class="film-card__genre">Musical</span>
        </p>
        <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
        <a class="film-card__comments">5 comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>`
  );
};

const loadMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const topRatedFilmsTemplate = () => {
  return (
    `<section class="films-list--extra" id="top-rated">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container"></div>
      </section>`
  );
};

const mostCommentedFilmsTemplate = () => {
  return (
    `<section class="films-list--extra" id="most-commented">
        <h2 class="films-list__title">Most commented</h2>
        <div class="films-list__container"></div>
    </section>`
  );
};

const filmsStatisticTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

function render(container, template, place) {
  container.insertAdjacentHTML(place, template);
}

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

render(headerElement, userProfileTemplae(), `beforeend`);
render(mainElement, mainNavTemplate(), `beforeend`);
render(mainElement, sortTemplate(), `beforeend`);
render(mainElement, filmsSectionTemplate(), `beforeend`);

const mainFilmsListElement = document.querySelector(`.films-list`);
const mainFilmsContainer = mainFilmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(mainFilmsContainer, filmCardTemplate(), `beforeend`);
}

render(mainFilmsListElement, loadMoreTemplate(), `beforeend`);

const filmsElement = document.querySelector(`.films`);

render(filmsElement, topRatedFilmsTemplate(), `beforeend`);
render(filmsElement, mostCommentedFilmsTemplate(), `beforeend`);

const topRatedFilmsElement = document.getElementById("top-rated");
const topRatedFilmsContainer = topRatedFilmsElement.querySelector(`.films-list__container`);

const mostCommentedFilmsElement = document.getElementById("most-commented");
const mostCommentedFilmsContainer = mostCommentedFilmsElement.querySelector(`.films-list__container`);


for (let i = 0; i < 2; i++) {
  render(topRatedFilmsContainer, filmCardTemplate(), `beforeend`);
}

for (let i = 0; i < 2; i++) {
  render(mostCommentedFilmsContainer, filmCardTemplate(), `beforeend`);
}

const footerElement = document.querySelector(`.footer`);
const footerStatisticContainer = footerElement.querySelector(`.footer__statistics`);

render(footerStatisticContainer, filmsStatisticTemplate(), `beforeend`);
