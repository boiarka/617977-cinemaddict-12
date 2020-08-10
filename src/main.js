import {
  userProfileTemplae
} from "./view/user-profile.js";

import {
  mainNavTemplate
} from "./view/site-nav.js";

import {
  sortTemplate
} from "./view/sort.js";

import {
  filmsSectionTemplate
} from "./view/films-section.js";

import {
  filmCardTemplate
} from "./view/film-card.js";

import {
  filmPopupTemplate
} from "./view/film-popup.js";

import {
  loadMoreTemplate
} from "./view/load-more.js";

import {
  topRatedFilmsTemplate
} from "./view/top-rated.js";

import {
  mostCommentedFilmsTemplate
} from "./view/most-commented.js";

import {
  filmsStatisticTemplate
} from "./view/films-stat.js";

import {
  generateFilms
} from "./mock/film.js";

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;
const EXTRA_FILM_COUNT = 2;

const films = new Array(FILM_COUNT).fill().map(generateFilms);

function render(container, template, place) {
  container.insertAdjacentHTML(place, template);
}

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

render(headerElement, userProfileTemplae(), `beforeend`);
render(mainElement, mainNavTemplate(films), `beforeend`);
render(mainElement, sortTemplate(), `beforeend`);
render(mainElement, filmsSectionTemplate(), `beforeend`);

const mainFilmsListElement = document.querySelector(`.films-list`);
const mainFilmsContainer = mainFilmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(mainFilmsContainer, filmCardTemplate(films[i]), `beforeend`);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  render(mainFilmsListElement, loadMoreTemplate(), `beforeend`);
  const loadMoreButton = document.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(mainFilmsContainer, filmCardTemplate(film), `beforeend`));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

const filmsElement = document.querySelector(`.films`);

render(filmsElement, topRatedFilmsTemplate(), `beforeend`);
render(filmsElement, mostCommentedFilmsTemplate(), `beforeend`);

const topRatedFilmsElement = document.getElementById(`top-rated`);
const topRatedFilmsContainer = topRatedFilmsElement.querySelector(`.films-list__container`);

const mostCommentedFilmsElement = document.getElementById(`most-commented`);
const mostCommentedFilmsContainer = mostCommentedFilmsElement.querySelector(`.films-list__container`);


for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
  render(topRatedFilmsContainer, filmCardTemplate(films[i]), `beforeend`);
}

for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
  render(mostCommentedFilmsContainer, filmCardTemplate(films[i]), `beforeend`);
}

const footerElement = document.querySelector(`.footer`);
const footerStatisticContainer = footerElement.querySelector(`.footer__statistics`);

render(footerStatisticContainer, filmsStatisticTemplate(FILM_COUNT), `beforeend`);

const filmsPoster = document.querySelectorAll(`.film-card__poster`);
filmsPoster[0].addEventListener(`click`, () => {
  render(footerStatisticContainer, filmPopupTemplate(films[0]), `beforeend`);
});
