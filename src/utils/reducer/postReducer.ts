import { IPostInfo } from "@/models/post.model";

export type PostState = {
  postList: IPostInfo[];
};

export type PostAction =
  | { type: 'post/set'; postList: IPostInfo[] };

export const PostInitialState: PostState = {
  postList: []
};

export const postReducer = (state: PostState, action: PostAction): PostState => {
  switch (action.type) {
    case 'post/set':
      return { postList: action.postList };
    default:
      return state;
  }
};
