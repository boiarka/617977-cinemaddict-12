import Observer from "../utils/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  addComment(comment) {
    this._comments.push(comment);
  }

  deleteComment(commentId) {
    this._comments = this._comments.filter((comment) => comment.id !== commentId);
  }

}
