import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

export const sortByDate = (filmA, filmB) => {
  return filmB.film_info.release.date - filmA.film_info.release.date;
};

export const sortByRating = (filmA, filmB) => {
  return filmB.film_info.total_rating - filmA.film_info.total_rating;
};

export const sortByComments = (filmA, filmB) => {
  return filmB.comments.length - filmA.comments.length;
};

export const commentDate = (dueDate) => {
  if (!(dueDate instanceof Date)) {
    return ``;
  }

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
  return moment.duration(Number(runtime), `minutes`)
    .format(`h[<span class="statistic__item-description">h</span>] m[<span class="statistic__item-description">m</span>]`, {
      trim: `both mid`
    });
};
