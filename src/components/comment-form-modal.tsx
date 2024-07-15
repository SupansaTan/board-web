import { IAddCommentRequest } from "@/models/comment.model";
import { getAccessToken } from "@/utils/auth/accessTokenHelper";
import { useRootState } from "@/utils/context/RootStateContext";
import { ToastState } from "@/utils/reducer/toastReducer";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  postId: string;
  handleClose: () => void;
}

const CommentFormModal: React.FC<Props> = ({ show, postId, handleClose }) => {
  const [comment, setComment] = useState("");
  const { dispatch } = useRootState();

  const handleAddComment = async () => {
    const accessToken = getAccessToken();
    const request = new IAddCommentRequest(comment);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${postId}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(request),
      }
    );

    let toastInfo: ToastState;
    const result = await response.json();
    if (result.statusCode === 200) {
      dispatch({ type: "post/setNeedToFetch", isNeedToFetch: true });
      toastInfo = {
        showToast: true,
        variant: "success",
        message: `Add comment successful`,
      };
    } else {
      toastInfo = {
        showToast: true,
        variant: "danger",
        message: `Faild to add comment to this post`,
      };
    }

    dispatch({ type: "toast/set", payload: toastInfo });
    handleClose();
  };

  useEffect(() => {
    setComment("");

    return () => {
      setComment("");
    };
  }, [show]);

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>Add Comments</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            rows={4}
            as="textarea"
            value={comment}
            className="col-12 shadow-none"
            placeholder="What's on your mind..."
            onChange={(e) => setComment(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer className="col-12 border-0 p-3">
          <Button className="col-12 col-lg-2 btn-cancel" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="col-12 col-lg-2 btn-success text-white"
            onClick={handleAddComment}
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommentFormModal;
