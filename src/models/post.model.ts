import { Community } from "@/enum/community.enum";
import { IComment } from "./comment.model";

export class IGetPostListRequest {
  title: string;
  community: number | null;
  isOnlyUserPost: boolean;

  constructor(
    title: string,
    community: number | null,
    isOnlyUserPost: boolean
  ) {
    this.title = title;
    this.community = community;
    this.isOnlyUserPost = isOnlyUserPost;
  }
}

export class IModifyPostRequest {
  postTitle: string;
  content: string;
  community: Community | number;

  constructor(
    postTitle: string,
    content: string,
    community: Community | number
  ) {
    this.postTitle = postTitle;
    this.content = content;
    this.community = community;
  }
}

export class IPostInfo {
  postId: string;
  postTitle: string;
  content: string;
  community: Community;
  createBy: string; // username
  createDate: Date;
  totalComments: number;
  comments?: IComment[];

  constructor(
    postId: string,
    postTitle: string,
    content: string,
    community: Community,
    createBy: string,
    createDate: Date,
    totalComments: number,
    comments?: IComment[]
  ) {
    this.postId = postId;
    this.postTitle = postTitle;
    this.content = content;
    this.community = community;
    this.createBy = createBy;
    this.createDate = createDate;
    this.totalComments = totalComments;
    this.comments = comments ?? [];
  }
}