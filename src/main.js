import UserProfileView from "./view/user-profile.js";
import SiteNavView from "./view/site-nav.js";
import SortView from "./view/sort.js";
import FilmSectionWiew from "./view/films-section.js";
import FilmsListWiew from "./view/films-list.js";
import FilmsContainer from "./view/films-container.js";

import FilmCardView from "./view/film-card.js";
import FilmPopupView from "./view/film-popup.js";

import LoadMoreView from "./view/load-more.js";

import TopRatedView from "./view/top-rated.js";
import MostCommentedView from "./view/most-commented.js";

import FilmsStatView from "./view/films-stat.js";
import NoFilmsView from "./view/no-films.js";

import {
  generateFilms
} from "./mock/film.js";

import {
  generateFilters
} from "./mock/filter.js";

import {
  render,
  RenderPosition,
  renderTemplate
} from "./utils.js";

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;
const EXTRA_FILM_COUNT = 2;

const films = new Array(FILM_COUNT).fill().map(generateFilms);
const filters = generateFilters(films);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const renderFilm = (filmsListElement, film) => {
  const filmComponent = new FilmCardView(film);
  const filmPopupComponent = new FilmPopupView(film);

  const openPopup = () => {
    render(mainElement, filmPopupComponent.getElement(), RenderPosition.BEFOREEND);
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
  filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    openPopup();
  });
  filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    openPopup();
  });
  filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    openPopup();
  });

  // обработчики попапа
  filmPopupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    closePopup();
  });

  render(filmsListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmSection = (mainSection, allFilms) => {
  const filmsSectionComponent = new FilmSectionWiew();
  render(mainSection, filmsSectionComponent.getElement(), RenderPosition.BEFOREEND);

  const filmsListComponent = new FilmsListWiew();
  render(filmsSectionComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);

  const filmsContainerComponent = new FilmsContainer();
  render(filmsListComponent.getElement(), filmsContainerComponent.getElement(), RenderPosition.BEFOREEND);

  // если нет фильмов
  if (allFilms.length === 0) {
    render(filmsListComponent.getElement(), new NoFilmsView().getElement(), RenderPosition.AFTERBEGIN);
    return;
  }

  for (let i = 0; i < Math.min(allFilms.length, FILM_COUNT_PER_STEP); i++) {
    renderFilm(filmsContainerComponent.getElement(), allFilms[i]);
  }

  if (allFilms.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    const loadMoreButton = new LoadMoreView();
    render(filmsListComponent.getElement(), loadMoreButton.getElement(), `beforeend`);

    loadMoreButton.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      allFilms
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmsContainerComponent.getElement(), film));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= allFilms.length) {
        loadMoreButton.getElement().remove();
        loadMoreButton.removeElement();
      }
    });
  }

  // top rated films
  const topRatedComponent = new TopRatedView();
  render(filmsSectionComponent.getElement(), topRatedComponent.getElement(), `beforeend`);
  const topRatedFilmsContainer = new FilmsContainer();
  render(topRatedComponent.getElement(), topRatedFilmsContainer.getElement(), `beforeend`);

  for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
    renderFilm(topRatedFilmsContainer.getElement(), films[i]);
  }

  // most commented films
  const mostCommentedComponent = new MostCommentedView();
  render(filmsSectionComponent.getElement(), mostCommentedComponent.getElement(), `beforeend`);
  const mostCommentedFilmsContainer = new FilmsContainer();
  render(mostCommentedComponent.getElement(), mostCommentedFilmsContainer.getElement(), `beforeend`);

  for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
    renderFilm(mostCommentedFilmsContainer.getElement(), films[i]);
  }
};

render(headerElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SiteNavView(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortView().getElement(), RenderPosition.BEFOREEND);


renderFilmSection(mainElement, films);
const footerStatisticContainer = document.querySelector(`.footer__statistics`);
render(footerStatisticContainer, new FilmsStatView(FILM_COUNT).getElement(), `beforeend`);
