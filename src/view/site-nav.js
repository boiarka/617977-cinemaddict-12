const filmsToFilterMap = {
  watchlist: (films) => films.filter((film) => film.isWatchlist).length,
  history: (films) => films.filter((film) => film.isWatched).length,
  favorites: (films) => films.filter((film) => film.isFavorites).length,
};

export const mainNavTemplate = (films) => {
  return (
    `<nav class="main-navigation">
          <div class="main-navigation__items">
            <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
            <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filmsToFilterMap.watchlist(films)}</span></a>
            <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filmsToFilterMap.history(films)}</span></a>
            <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filmsToFilterMap.favorites(films)}</span></a>
          </div>
          <a href="#stats" class="main-navigation__additional">Stats</a>
        </nav>`
  );
};
