import AbstractView from "./abstract.js";

import {
  statusName
} from "../utils/film.js";

const userProfileTemplae = (watchedFilmsCount) => {
  return (
    `<section class="header__profile profile">
          <p class="profile__rating">${statusName(watchedFilmsCount)}</p>
          <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        </section>`
  );
};

export default class UserProfile extends AbstractView {
  constructor(watchedFilmsCount) {
    super();
    this._watchedFilmsCount = watchedFilmsCount;
  }

  getTemplate() {
    return userProfileTemplae(this._watchedFilmsCount);
  }
}
