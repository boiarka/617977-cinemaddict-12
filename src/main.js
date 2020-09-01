import UserProfileView from "./view/user-profile.js";
import FilmsStatView from "./view/films-stat.js";

import MovieListPresenter from "./presenter/movies-list.js";
import FilterPresenter from "./presenter/filter.js";

import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";

import {
  generateFilms
} from "./mock/film.js";

import {
  render,
  RenderPosition,
  remove
} from "./utils/render.js";

const FILM_COUNT = 20;

const films = new Array(FILM_COUNT).fill().map(generateFilms);


const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

const filmSectionPresenter = new MovieListPresenter(mainElement, bodyElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);

render(headerElement, new UserProfileView(), RenderPosition.BEFOREEND);

filterPresenter.init();
filmSectionPresenter.init();

const footerStatisticContainer = document.querySelector(`.footer__statistics`);
render(footerStatisticContainer, new FilmsStatView(FILM_COUNT), `beforeend`);
