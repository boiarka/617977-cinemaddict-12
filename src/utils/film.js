import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

import {
  UserRangs
} from "../const";

momentDurationFormatSetup(moment);

export const sortByDate = (filmA, filmB) => {
  const filmADate = moment(filmA.film_info.release.date).year();
  const filmBDate = moment(filmB.film_info.release.date).year();

  return filmBDate - filmADate;
};

export const sortByRating = (filmA, filmB) => {
  return Math.round(filmB.film_info.total_rating) - Math.round(filmA.film_info.total_rating);
};


export const commentDate = (dueDate) => {
  return moment(dueDate).format(`YYYY/MM/DD hh:mm`);
};

export const getFilmDuration = (runtime) => {
  return moment.duration(Number(runtime), `minutes`)
    .format(`h[h] m[m]`, {
      trim: `both mid`
    });
};

export const totalFilmsDuration = (runtime) => {

  const timeObj = moment.duration(Number(runtime), `minutes`);

  const hours = Math.trunc(timeObj.asHours());
  const minutes = timeObj.minutes();

  return `${hours}<span class="statistic__item-description">h</span> ${minutes}<span class="statistic__item-description">m</span>`;
};

export const getFilmsByDateToday = (date) => {
  const dateToday = moment(new Date()).format();
  return moment(date).isSame(dateToday, `day`);
};

export const getFilmsByDateFromTo = (date, days) => {
  const dateToday = moment(new Date()).format();
  const sampleDaysAgo = moment().subtract(days, `days`);

  return moment(date).isBetween(sampleDaysAgo, dateToday);
};

export const statusName = (count) => {
  if (count === 0) {
    return ``;
  }
  if (count >= 1 && count <= 10) {
    return UserRangs.NOVICE;
  }

  if (count >= 11 && count <= 20) {
    return UserRangs.FAN;
  }

  if (count >= 21) {
    return UserRangs.MOVIE_BUFF;
  }

  return ``;
};
