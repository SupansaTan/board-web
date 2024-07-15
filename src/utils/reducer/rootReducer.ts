import { PostAction, PostInitialState, PostState, postReducer } from "./postReducer";
import { ToastAction, ToastInitialState, ToastState, toastReducer } from "./toastReducer";

export type RootState = {
  post: PostState;
  toast: ToastState;
};

export type RootAction = PostAction | ToastAction;

export const initialState: RootState = {
  post: PostInitialState,
  toast: ToastInitialState,
};

export const rootReducer = (state: RootState, action: RootAction): RootState => {
  return {
    post: postReducer(state.post, action as PostAction),
    toast: toastReducer(state.toast, action as ToastAction),
  };
};
