import { useRootState } from "@/utils/context/RootStateContext";
import { ToastInitialState } from "@/utils/reducer/toastReducer";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastComponent: React.FC = () => {
  const { state, dispatch } = useRootState();

  return (
    <ToastContainer position="top-end">
      <Toast
        delay={3000}
        show={state.toast.showToast}
        className="d-inline-block m-1 text-white"
        bg={state.toast.variant.toLowerCase()}
        onClose={() => dispatch({ type: "toast/clear" })}
        autohide
      >
        <Toast.Body>{state.toast.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastComponent;
