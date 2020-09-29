import AbstractView from "./abstract.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  totalFilmsDuration,
  getFilmsByDateToday,
  getFilmsByDateFromTo,
  statusName
} from "../utils/film.js";

const BAR_HEIGHT = 50;


const getWatchedFilms = (films) => {
  return films.filter((film) => film.user_details.already_watched);
};

const getObjCountGenres = (films) => {
  const watchedFilmGenres = [];
  films.forEach((film) => {
    watchedFilmGenres.push(...film.film_info.genre);
  });

  const objGenres = {};

  for (let i = 0; i < watchedFilmGenres.length; i++) {
    let item = watchedFilmGenres[i];
    objGenres[item] = objGenres[item] ? objGenres[item] + 1 : 1;
  }

  return objGenres;
};

const renderChart = (statisticCtx, genres, countGenres) => {

  statisticCtx.height = BAR_HEIGHT * 5;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genres,
      datasets: [{
        data: countGenres,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatisticTemplate = (films, topGenre) => {

  const watchedFilms = getWatchedFilms(films);
  const watchedFilmsCount = watchedFilms.length;

  const filmsDurations = [];
  watchedFilms.forEach((film) => {
    filmsDurations.push(film.film_info.runtime);
  });

  const totalDuration = watchedFilmsCount > 0 ? totalFilmsDuration(filmsDurations.reduce((total, duration) => total + duration)) : 0;

  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${statusName(watchedFilms.length)}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text"><span id="statFilmCount">${watchedFilmsCount}</span> <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text" id="statFilmDuration">${totalDuration}</p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text" id="statFilmTopGenre">${topGenre}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

</section>`;
};

export default class Statistic extends AbstractView {
  constructor(mainElement) {
    super();

    this._mainElement = mainElement;
    this._films = null;
    this._watchedFilms = null;

    this._statChangeHandler = this._statChangeHandler.bind(this);
  }

  setFilms(films) {
    this._films = films;
  }

  getTemplate() {
    return createStatisticTemplate(this._films, this._getTopGenre());
  }

  renderChart(films) {
    let watchedFilms = this._getWatchedFilms();

    if (films) {
      watchedFilms = films;
    }

    const objGenres = getObjCountGenres(watchedFilms);

    const sortedGenres = Object.keys(objGenres).sort(function (a, b) {
      return objGenres[b] - objGenres[a];
    });

    const countGenres = Object.values(objGenres).sort(function (a, b) {
      return b - a;
    });

    this._topGenre = sortedGenres[0];

    this._setCharts(sortedGenres, countGenres);
  }

  _getWatchedFilms() {
    this._watchedFilms = getWatchedFilms(this._films);

    return this._watchedFilms;
  }

  _getTopGenre(films) {
    let watchedFilms = this._getWatchedFilms();

    if (films) {
      watchedFilms = films;
    }

    const objGenres = getObjCountGenres(watchedFilms);
    const topGenre = Object.keys(objGenres).sort(function (a, b) {
      return objGenres[b] - objGenres[a];
    })[0];

    return topGenre ? topGenre : ``;
  }

  _setCharts(genres, countGenres) {
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    this._filmChart = renderChart(statisticCtx, genres, countGenres);
  }

  _getTodayFilms(watchedFilms) {
    const filmsByDate = watchedFilms.filter((film) => {
      return getFilmsByDateToday(film.user_details.watching_date);
    });
    return filmsByDate;
  }

  _getFilmsByDate(watchedFilms, days) {
    const filmsByDate = watchedFilms.filter((film) => {
      return getFilmsByDateFromTo(film.user_details.watching_date, days);
    });
    return filmsByDate;
  }

  _statChangeHandler(evt) {

    const statFilterName = {
      ALL: `statistic-all-time`,
      TODAY: `statistic-today`,
      WEEK: `statistic-week`,
      MONTH: `statistic-month`,
      YEAR: `statistic-year`,
    };

    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    if (statFilterName.ALL === evt.target.htmlFor) {
      this._rerenderStatsInfo(this._getWatchedFilms());
    }

    if (statFilterName.TODAY === evt.target.htmlFor) {
      const films = this._getTodayFilms(this._watchedFilms);
      this._rerenderStatsInfo(films);
    }

    if (statFilterName.WEEK === evt.target.htmlFor) {
      const films = this._getFilmsByDate(this._watchedFilms, 7);
      this._rerenderStatsInfo(films);
    }

    if (statFilterName.MONTH === evt.target.htmlFor) {
      const films = this._getFilmsByDate(this._watchedFilms, 30);
      this._rerenderStatsInfo(films);
    }

    if (statFilterName.YEAR === evt.target.htmlFor) {
      const films = this._getFilmsByDate(this._watchedFilms, 360);
      this._rerenderStatsInfo(films);
    }

    evt.preventDefault();
  }

  _rerenderStatsInfo(films) {
    const filmsDurations = [];
    films.forEach((film) => {
      filmsDurations.push(film.film_info.runtime);
    });
    const totalDuration = films.length > 0 ? totalFilmsDuration(filmsDurations.reduce((total, duration) => total + duration)) : 0;

    this.getElement().querySelector(`#statFilmCount`).textContent = films.length;
    this.getElement().querySelector(`#statFilmDuration`).innerHTML = totalDuration;
    this.getElement().querySelector(`#statFilmTopGenre`).textContent = this._getTopGenre(films);

    this.renderChart(films);
  }

  setStatChangeHandler() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`click`, this._statChangeHandler);
  }
}
