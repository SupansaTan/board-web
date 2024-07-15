export class IComment {
  commentId: string;
  postId: string;
  commentBy: string;
  comment: string;
  createDate: Date;

  constructor(
    commentId: string,
    postId: string,
    commentBy: string,
    comment: string,
    createDate: Date
  ) {
    this.commentId = commentId;
    this.postId = postId;
    this.commentBy = commentBy;
    this.comment = comment;
    this.createDate = createDate;
  }
}

export class IAddCommentRequest {
  comment: string;

  constructor(comment: string) {
    this.comment = comment;
  }
}