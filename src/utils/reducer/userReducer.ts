export type UserState = {
  username: string;
};

export type UserAction =
  | { type: 'user/set'; username: string }
  | { type: 'user/clear' }

export const UserInitialState: UserState = {
  username: ""
};

export const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'user/set':
      return { ...state, username: action.username };
    case 'user/clear':
      return UserInitialState;
    default:
      return state;
  }
};
