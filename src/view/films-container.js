import AbstractView from "./abstract.js";

const filmsContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmsContainer extends AbstractView {
  getTemplate() {
    return filmsContainerTemplate();
  }
}
