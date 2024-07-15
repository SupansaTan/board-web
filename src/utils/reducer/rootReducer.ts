import { PostAction, PostInitialState, PostState, postReducer } from "./postReducer";
import { ToastAction, ToastInitialState, ToastState, toastReducer } from "./toastReducer";
import { UserAction, UserInitialState, UserState, userReducer } from "./userReducer";

export type RootState = {
  post: PostState;
  toast: ToastState;
  user: UserState;
};

export type RootAction = PostAction | ToastAction | UserAction;

export const initialState: RootState = {
  post: PostInitialState,
  toast: ToastInitialState,
  user: UserInitialState,
};

export const rootReducer = (state: RootState, action: RootAction): RootState => {
  return {
    post: postReducer(state.post, action as PostAction),
    toast: toastReducer(state.toast, action as ToastAction),
    user: userReducer(state.user, action as UserAction),
  };
};
