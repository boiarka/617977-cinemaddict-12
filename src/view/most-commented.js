import {
  createElement
} from "../utils.js";

const mostCommentedFilmsTemplate = () => {
  return (
    `<section class="films-list--extra" id="most-commented">
          <h2 class="films-list__title">Most commented</h2>
      </section>`
  );
};

export default class MostCommented {
  constructor(count) {
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return mostCommentedFilmsTemplate(this._count);
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
