import AbstractView from "./abstract.js";

const topRatedFilmsTemplate = () => {
  return (
    `<section class="films-list--extra" id="top-rated">
          <h2 class="films-list__title">Top rated</h2>
        </section>`
  );
};

export default class TopRated extends AbstractView {
  getTemplate() {
    return topRatedFilmsTemplate(this._count);
  }
}
