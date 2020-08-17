import AbstractView from "./abstract.js";

const mostCommentedFilmsTemplate = () => {
  return (
    `<section class="films-list--extra" id="most-commented">
          <h2 class="films-list__title">Most commented</h2>
      </section>`
  );
};

export default class MostCommented extends AbstractView {
  getTemplate() {
    return mostCommentedFilmsTemplate();
  }
}
