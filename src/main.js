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

const FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;


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

const topRatedFilmsElement = document.getElementById(`top-rated`);
const topRatedFilmsContainer = topRatedFilmsElement.querySelector(`.films-list__container`);

const mostCommentedFilmsElement = document.getElementById(`most-commented`);
const mostCommentedFilmsContainer = mostCommentedFilmsElement.querySelector(`.films-list__container`);


for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
  render(topRatedFilmsContainer, filmCardTemplate(), `beforeend`);
}

for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
  render(mostCommentedFilmsContainer, filmCardTemplate(), `beforeend`);
}

const footerElement = document.querySelector(`.footer`);
const footerStatisticContainer = footerElement.querySelector(`.footer__statistics`);

render(footerStatisticContainer, filmsStatisticTemplate(), `beforeend`);
