import Observer from "../utils/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  getCommentsById(id) {
    return this._comments.filter((comment) => comment.filmId === id);
  }

  addComment(comment) {
    this._comments.push(comment);
  }

  deleteComment(commentId) {
    this._comments = this._comments.filter((comment) => comment.id !== commentId);
  }

}
