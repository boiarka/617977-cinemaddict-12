import UserProfileView from "./view/user-profile.js";
import SiteNavView from "./view/site-nav.js";
import SortView from "./view/sort.js";
import FilmsStatView from "./view/films-stat.js";

import FilmSectionPresenter from "./presenter/film-section.js";

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
const FILM_COUNT_PER_STEP = 5;
const EXTRA_FILM_COUNT = 2;

const films = new Array(FILM_COUNT).fill().map(generateFilms);
const filters = generateFilters(films);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const filmSectionPresenter = new FilmSectionPresenter(mainElement);

render(headerElement, new UserProfileView(), RenderPosition.BEFOREEND);
render(mainElement, new SiteNavView(filters), RenderPosition.BEFOREEND);
render(mainElement, new SortView(), RenderPosition.BEFOREEND);


filmSectionPresenter.init(films);

const footerStatisticContainer = document.querySelector(`.footer__statistics`);
render(footerStatisticContainer, new FilmsStatView(FILM_COUNT), `beforeend`);
