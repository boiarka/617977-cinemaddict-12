import AbstractView from "./abstract.js";

const filmsSectionTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsSection extends AbstractView {
  getTemplate() {
    return filmsSectionTemplate();
  }
}
