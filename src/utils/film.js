export const sortByDate = (filmA, filmB) => {
  return filmB.date - filmA.date;
};

export const sortByRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};
