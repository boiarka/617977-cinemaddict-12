import {
  createElement
} from "../utils.js";

const topRatedFilmsTemplate = () => {
  return (
    `<section class="films-list--extra" id="top-rated">
          <h2 class="films-list__title">Top rated</h2>
        </section>`
  );
};

export default class TopRated {
  constructor(count) {
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return topRatedFilmsTemplate(this._count);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
