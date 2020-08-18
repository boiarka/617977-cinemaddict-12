import FilmSectionWiew from "../view/films-section.js";
import FilmsListWiew from "../view/films-list.js";
import FilmsContainer from "../view/films-container.js";

import FilmCardView from "../view/film-card.js";
import FilmPopupView from "../view/film-popup.js";

import LoadMoreView from "../view/load-more.js";
import SortView from "../view/sort.js";

import TopRatedView from "../view/top-rated.js";
import MostCommentedView from "../view/most-commented.js";

import NoFilmsView from "../view/no-films.js";

const FILM_COUNT_PER_STEP = 5;
const EXTRA_FILM_COUNT = 2;


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
  SortType
} from "../const.js";

export default class MovieList {
  constructor(mainSection) {
    this._mainSection = mainSection;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._currenSortType = SortType.DEFAULT;

    this._filmsSectionComponent = new FilmSectionWiew();
    this._filmsListComponent = new FilmsListWiew();
    this._filmsContainerComponent = new FilmsContainer();
    this._noFilmsComponent = new NoFilmsView();
    this._loadMoreButtonComponent = new LoadMoreView();
    this._sortComponent = new SortView();

    this._topRatedFilmsComponent = new TopRatedView();
    this._topRatedFilmsContainer = new FilmsContainer();

    this._mostCommentedFilmsComponent = new MostCommentedView();
    this._mostCommentedFilmsContainer = new FilmsContainer();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(allFilms) {
    this._allFilms = allFilms.slice();
    this._sourcedAllFilms = allFilms.slice();

    this._renderSort();
    render(this._mainSection, this._filmsSectionComponent, RenderPosition.BEFOREEND);
    render(this._filmsSectionComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilmSection();
  }

  _handleSortTypeChange(sortType, element) {
    if (this._currenSortType === sortType) {
      return;
    }

    this._sortLinks.forEach((item) => {
      item.classList.remove(`sort__button--active`);
    });
    element.classList.add(`sort__button--active`);

    this._sortFilms(sortType);
    this._clearTaskList();
    this._renderMainFilmsList();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._allFilms.sort(sortByDate);
        break;
      case SortType.RATING:
        this._allFilms.sort(sortByRating);
        break;
      default:
        this._allFilms = this._sourcedAllFilms.slice();
    }

    this._currenSortType = sortType;
  }

  _renderSort() {
    render(this._mainSection, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    this._sortLinks = this._sortComponent.getElement().querySelectorAll(`.sort__button`);
  }

  _renderFilm(film, container) {
    const filmComponent = new FilmCardView(film);
    const filmPopupComponent = new FilmPopupView(film);

    const openPopup = () => {
      render(this._mainSection, filmPopupComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const closePopup = () => {
      filmPopupComponent.getElement().remove();
      filmPopupComponent.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    // обработчики карточки фильма
    filmComponent.setPosterClickHandler(() => {
      openPopup();
    });
    filmComponent.setTitleClickHandler(() => {
      openPopup();
    });
    filmComponent.setCommentsClickHandler(() => {
      openPopup();
    });

    // обработчики попапа
    filmPopupComponent.setPopupCloseClickHandler(() => {
      closePopup();
    });

    render(container, filmComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._allFilms.slice(from, to).forEach((film) => {
      this._renderFilm(film, this._filmsContainerComponent);
    });
  }

  _renderNoFilms() {
    render(this._filmsListComponent, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  _handleLoadMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._allFilms.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._filmsListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _clearTaskList() {
    this._filmsContainerComponent.getElement().innerHTML = ``;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
  }

  _renderMainFilmsList() {
    this._renderFilms(0, Math.min(this._allFilms.length, FILM_COUNT_PER_STEP));

    if (this._allFilms.length > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderTopRatedFilmsList() {
    render(this._filmsSectionComponent, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);

    render(this._topRatedFilmsComponent, this._topRatedFilmsContainer, RenderPosition.BEFOREEND);

    for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
      this._renderFilm(this._allFilms[i], this._topRatedFilmsContainer);
    }
  }

  _renderMostCommentedFilmsList() {
    render(this._filmsSectionComponent, this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);

    render(this._mostCommentedFilmsComponent, this._mostCommentedFilmsContainer, RenderPosition.BEFOREEND);

    for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
      this._renderFilm(this._allFilms[i], this._mostCommentedFilmsContainer);
    }
  }

  _renderFilmSection() {
    if (this._allFilms.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderMainFilmsList();
    this._renderTopRatedFilmsList();
    this._renderMostCommentedFilmsList();
  }
}
