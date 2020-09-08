import FilmSectionWiew from "../view/films-section.js";
import FilmsListWiew from "../view/films-list.js";
import FilmsContainer from "../view/films-container.js";

import LoadMoreView from "../view/load-more.js";
import SortView from "../view/sort.js";

import TopRatedView from "../view/top-rated.js";
import MostCommentedView from "../view/most-commented.js";

import NoFilmsView from "../view/no-films.js";

import FilmPresenter from "./film.js";

const FILM_COUNT_PER_STEP = 5;


import {
  render,
  remove,
  RenderPosition
} from "../utils/render.js";

import {
  sortByDate,
  sortByRating
} from "../utils/film.js";

import {
  SortType,
  UpdateType,
  UserAction
} from "../const.js";

import {
  filter
} from "../utils/filter.js";

const FiltersName = {
  all: `default`,
  watchlist: `watchlist`,
  history: `already_watched`,
  favorites: `favorite`
};

export default class MovieList {
  constructor(mainSection, bodyElement, filmsModel, filterModel, commentsModel) {
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;

    this._mainSection = mainSection;
    this._bodyElement = bodyElement;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};

    this._sortComponent = null;
    this._loadMoreButtonComponent = null;

    this._filmsSectionComponent = new FilmSectionWiew();
    this._filmsListComponent = new FilmsListWiew();
    this._filmsContainerComponent = new FilmsContainer();
    this._noFilmsComponent = new NoFilmsView();

    this._topRatedFilmsComponent = new TopRatedView();
    this._topRatedFilmsContainer = new FilmsContainer();

    this._mostCommentedFilmsComponent = new MostCommentedView();
    this._mostCommentedFilmsContainer = new FilmsContainer();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    render(this._mainSection, this._filmsSectionComponent, RenderPosition.BEFOREEND);
    render(this._filmsSectionComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderList();
  }

  destroy() {
    this._clearList({
      resetRenderedFilmCount: true,
      resetSortType: true
    });

    remove(this._filmsSectionComponent);
    remove(this._filmsListComponent);

    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortByDate);
      case SortType.RATING:
        return filteredFilms.sort(sortByRating);
    }


    return filteredFilms;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearList({
      resetRenderedFilmCount: true
    });
    this._renderList();
  }

  _handleModeChange() {
    Object.values(this._filmPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    const filterType = this._filterModel.getFilter();
    const filmFilteredType = FiltersName[filterType];

    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._filmPresenter[data.id].init(data);

        if (FiltersName.all === filmFilteredType) {
          return;
        }

        if (data.user_details[filmFilteredType] === false) {
          this._clearList();
          this._renderList();
        }
        break;
      case UpdateType.MAJOR:
        this._clearList({
          resetRenderedFilmCount: true,
          resetSortType: true
        });
        this._renderList();
        break;
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmsSectionComponent, this._sortComponent, RenderPosition.BEFOREBEGIN);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmsContainerComponent, this._handleViewAction, this._bodyElement, this._handleModeChange, this._commentsModel);

    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderExtraFilm(film, container) {
    const filmPresenter = new FilmPresenter(container);
    filmPresenter.init(film);
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._filmsListComponent, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  _handleLoadMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }

    this._loadMoreButtonComponent = new LoadMoreView();
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
    render(this._filmsListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderMainFilmsList() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILM_COUNT_PER_STEP));

    this._renderFilms(films);

    if (filmCount > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderTopRatedFilmsList() {
    render(this._filmsSectionComponent, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);

    render(this._topRatedFilmsComponent, this._topRatedFilmsContainer, RenderPosition.BEFOREEND);
  }

  _renderMostCommentedFilmsList() {
    render(this._filmsSectionComponent, this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);

    render(this._mostCommentedFilmsComponent, this._mostCommentedFilmsContainer, RenderPosition.BEFOREEND);
  }

  _renderList() {
    const taskCount = this._getFilms().length;

    if (taskCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    this._renderMainFilmsList();
    this._renderTopRatedFilmsList();
    this._renderMostCommentedFilmsList();
  }

  _clearList({
    resetRenderedFilmCount = false,
    resetSortType = false
  } = {}) {

    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._sortComponent);
    remove(this._noFilmsComponent);
    remove(this._loadMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, FILM_COUNT_PER_STEP);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
