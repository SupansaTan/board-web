import { IPostInfo } from "@/models/post.model";

export type PostState = {
  postList: IPostInfo[];
  isNeedToFetch: boolean;
};

export type PostAction =
  | { type: 'post/setPost'; postList: IPostInfo[] }
  | { type: 'post/setNeedToFetch'; isNeedToFetch: boolean }

export const PostInitialState: PostState = {
  postList: [],
  isNeedToFetch: true
};

export const postReducer = (state: PostState, action: PostAction): PostState => {
  switch (action.type) {
    case 'post/setPost':
      return { ...state, postList: action.postList };
    case 'post/setNeedToFetch':
      return { ...state, isNeedToFetch: action.isNeedToFetch };
    default:
      return state;
  }
};
