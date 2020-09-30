import SiteMenuView from "./view/site-nav.js";
import Statistic from "./view/statistic.js";
import FilmsStatView from "./view/films-stat.js";

import MovieListPresenter from "./presenter/movies-list.js";
import FilterPresenter from "./presenter/filter.js";

import FilmsModel from "./model/films.js";
import CommentsModel from "./model/comments.js";
import FilterModel from "./model/filter.js";

import {
  UpdateType
} from "./const.js";

import Api from "./api.js";

import {
  render,
  RenderPosition,
  remove
} from "./utils/render.js";

const AUTHORIZATION = `Basic hSsafsaf238udshaa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;


const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const filterModel = new FilterModel();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

const menuComponent = new SiteMenuView();
render(mainElement, menuComponent, RenderPosition.AFTERBEGIN);

const filmSectionPresenter = new MovieListPresenter(mainElement, bodyElement, filmsModel, filterModel, commentsModel, api, headerElement);
const filterPresenter = new FilterPresenter(menuComponent.getElement(), filterModel, filmsModel);
const footerStatisticContainer = document.querySelector(`.footer__statistics`);


filterPresenter.init();
filmSectionPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    render(footerStatisticContainer, new FilmsStatView(films.length), `beforeend`);
  }).catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });


const statisticComponent = new Statistic(mainElement);

const openStat = () => {
  filmSectionPresenter.destroy();
  statisticComponent.setFilms(filmsModel.getFilms());
  render(mainElement, statisticComponent, RenderPosition.BEFOREEND);
  statisticComponent.renderChart();
  statisticComponent.setStatChangeHandler();
};

const closeStat = () => {
  remove(statisticComponent);
  filmSectionPresenter.init();
};

menuComponent.setStatClickHandler(openStat, closeStat);
