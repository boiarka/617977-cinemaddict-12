import UserProfileView from "./view/user-profile.js";
import SiteNavView from "./view/site-nav.js";
import FilmsStatView from "./view/films-stat.js";

import MovieListPresenter from "./presenter/movies-list.js";

import {
  generateFilms
} from "./mock/film.js";

import {
  generateFilters
} from "./mock/filter.js";

import {
  render,
  RenderPosition,
  remove
} from "./utils/render.js";

const FILM_COUNT = 20;

const films = new Array(FILM_COUNT).fill().map(generateFilms);
const filters = generateFilters(films);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

const filmSectionPresenter = new MovieListPresenter(mainElement, bodyElement);

render(headerElement, new UserProfileView(), RenderPosition.BEFOREEND);
render(mainElement, new SiteNavView(filters), RenderPosition.BEFOREEND);


filmSectionPresenter.init(films);

const footerStatisticContainer = document.querySelector(`.footer__statistics`);
render(footerStatisticContainer, new FilmsStatView(FILM_COUNT), `beforeend`);
