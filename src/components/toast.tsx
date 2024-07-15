import { useRootState } from "@/utils/context/RootStateContext";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastComponent: React.FC = () => {
  const { state } = useRootState();

  return (
    <ToastContainer position="top-end" style={{ zIndex: 1 }}>
      <Toast
        show={state.toast.showToast}
        autohide={true}
        className="d-inline-block m-1"
        bg={state.toast.variant.toLowerCase()}
      >
        <Toast.Body>{state.toast.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastComponent;
