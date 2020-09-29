import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

export const sortByDate = (filmA, filmB) => {
  const filmADate = moment(filmA.film_info.release.date).year();
  const filmBDate = moment(filmB.film_info.release.date).year();

  return filmBDate - filmADate;
};

export const sortByRating = (filmA, filmB) => {
  return filmB.film_info.total_rating - filmA.film_info.total_rating;
};

export const sortByComments = (filmA, filmB) => {
  return filmB.comments.length - filmA.comments.length;
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

// для вывода Total duration в СТАТИСТИКЕ фильмов
export const totalFilmsDuration = (runtime) => {

  const timeObj = moment.duration(Number(runtime), `minutes`);

  const hours = Math.trunc(timeObj.asHours());
  const minutes = timeObj.minutes();

  return `${hours}<span class="statistic__item-description">h</span> ${minutes}<span class="statistic__item-description">m</span>`;

  // return moment.duration(Number(runtime), `minutes`)
  //   .format(`h[<span class="statistic__item-description">h</span>] m[<span class="statistic__item-description">m</span>]`, {
  //     trim: `both mid`
  //   });
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
    return `Novice`;
  }

  if (count >= 11 && count <= 20) {
    return `Fan`;
  }

  if (count >= 21) {
    return `Movie buff`;
  }

  return ``;
};
