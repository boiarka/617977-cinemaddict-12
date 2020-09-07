import UserProfileView from "./view/user-profile.js";
import FilmsStatView from "./view/films-stat.js";
import SiteMenuView from "./view/site-nav.js";
import Statistic from "./view/statistic.js";

import MovieListPresenter from "./presenter/movies-list.js";
import FilterPresenter from "./presenter/filter.js";

import FilmsModel from "./model/films.js";
import CommentsModel from "./model/comments.js";
import FilterModel from "./model/filter.js";

import {
  generateFilms,
  generateComments
} from "./mock/film.js";

import {
  render,
  RenderPosition,
  remove
} from "./utils/render.js";

const FILM_COUNT = 20;

const films = new Array(FILM_COUNT).fill().map(generateFilms);
const comments = [];

films.forEach((film) => {
  comments.push(...generateComments(film.id));
});


const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const filterModel = new FilterModel();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

const menuComponent = new SiteMenuView();
render(mainElement, menuComponent, RenderPosition.AFTERBEGIN);

const filmSectionPresenter = new MovieListPresenter(mainElement, bodyElement, filmsModel, filterModel, commentsModel);
const filterPresenter = new FilterPresenter(menuComponent.getElement(), filterModel, filmsModel);

render(headerElement, new UserProfileView(), RenderPosition.BEFOREEND);

filterPresenter.init();
filmSectionPresenter.init();


const statisticCOmponent = new Statistic();

const openStat = () => {
  filmSectionPresenter.destroy();
  render(mainElement, statisticCOmponent, RenderPosition.BEFOREEND);
};

const closeStat = () => {
  remove(statisticCOmponent);
  filmSectionPresenter.init();
};

menuComponent.setStatClickHandler(openStat, closeStat);

const footerStatisticContainer = document.querySelector(`.footer__statistics`);
render(footerStatisticContainer, new FilmsStatView(FILM_COUNT), `beforeend`);
