export type ToastState = {
  showToast: boolean;
  variant: string;
  message: string;
};

export type ToastAction =
  | { type: 'toast/set'; payload: ToastState }
  | { type: 'toast/clear' };

export const ToastInitialState: ToastState = {
  showToast: false,
  variant: 'success',
  message: ''
};

export const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'toast/set':
      return action.payload;
    case 'toast/clear':
      return ToastInitialState;
    default:
      return state;
  }
};
