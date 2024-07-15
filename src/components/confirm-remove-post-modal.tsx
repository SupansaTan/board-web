import { useRootState } from "@/utils/context/RootStateContext";
import { ToastState } from "@/utils/reducer/toastReducer";
import { Button, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  postId: string;
  handleClose: () => void;
}

const ConfirmRemovePostModal: React.FC<Props> = ({
  show,
  postId,
  handleClose,
}) => {
  const { dispatch } = useRootState();

  const ConfirmDeletePost = async () => {
    const token = "";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authentication: `${token}`,
        },
      }
    );

    let toastInfo: ToastState;
    const result = await response.json();
    if (result.statusCode === 200) {
      toastInfo = {
        showToast: true,
        variant: "success",
        message: `Delete this post successful`,
      };
    } else {
      toastInfo = {
        showToast: true,
        variant: "danger",
        message: `Faild to delete this post`,
      };
    }

    dispatch({ type: "toast/set", payload: toastInfo });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="text-center mt-2 p-4">
          <p className="mb-2 fw-bold">
            Please confirm if you wish to <br /> delete the post
          </p>
          <p className="mb-1">Are you sure you want to delete the post?</p>
          <p className="mb-0">Once deleted, it cannot be recovered.</p>
        </Modal.Body>

        <Modal.Footer className="border-0 row row-cols-1 row-cols-lg-2 g-2 p-4">
          <div className="col m-0">
            <Button className="col-12 btn-grey-cancel" onClick={handleClose}>
              Cancel
            </Button>
          </div>
          <div className="col m-0">
            <Button
              className="col-12 btn-danger text-white"
              onClick={ConfirmDeletePost}
            >
              Delete
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmRemovePostModal;
