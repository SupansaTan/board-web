import { Button, Form, Modal } from "react-bootstrap";
import CommunityDropdown from "./community-dropdown";
import { ChangeEvent, useEffect, useState } from "react";
import { IModifyPostRequest, IPostInfo } from "@/models/post.model";
import { useRootState } from "@/utils/context/RootStateContext";
import { ToastState } from "@/utils/reducer/toastReducer";

interface PostFormModalProps {
  show: boolean;
  postInfo?: IPostInfo;
  handleClose: () => void;
}

const PostFormModal: React.FC<PostFormModalProps> = ({
  show,
  postInfo,
  handleClose,
}) => {
  const action = postInfo ? "Edit" : "Create";
  const buttonConfirmLabel = postInfo ? "Confirm" : "Post";
  const { dispatch } = useRootState();
  const [postForm, setPostForm] = useState<IModifyPostRequest>(
    new IModifyPostRequest("", "", 0)
  );

  useEffect(() => {
    if (postInfo) {
      setPostForm(postInfo);
    } else {
      setPostForm(new IModifyPostRequest("", "", 0));
    }
  }, [postInfo]);

  const handleUpdateForm = (type: string, event: ChangeEvent<any>) => {
    let updatedPost: IModifyPostRequest = postForm;
    switch (type) {
      case "title":
        updatedPost = {
          ...postForm,
          postTitle: event.target.value,
        };
        break;
      case "content":
        updatedPost = {
          ...postForm,
          content: event.target.value,
        };
        break;
      case "community":
        updatedPost = {
          ...postForm,
          community: event.target.value,
        };
        break;
    }

    setPostForm(updatedPost);
    console.log(postForm);
  };

  const ConfirmModifyForm = async () => {
    const token = "";
    const method = postInfo ? "PUT" : "POST";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post`,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authentication: `${token}`,
        },
        body: JSON.stringify(postForm),
      }
    );

    let toastInfo: ToastState;
    const result = await response.json();
    const action = postInfo ? "modify" : "add";
    if (result.statusCode === 200) {
      toastInfo = {
        showToast: true,
        variant: "success",
        message: `${action} post successful`,
      };
    } else {
      toastInfo = {
        showToast: true,
        variant: "danger",
        message: `Faild to ${action} post`,
      };
    }

    dispatch({ type: "toast/set", payload: toastInfo });
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>{action} Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <CommunityDropdown
              className="col-12 col-lg-auto bg-white border-success text-success mb-2"
              placeholder="Choose a community"
              communityState={postForm.community}
              handleSelected={(e) => handleUpdateForm("community", e)}
            />
            <Form.Control
              type="text"
              placeholder="Title"
              value={postForm.postTitle}
              onChange={(e) => handleUpdateForm("title", e)}
              className="col-12 shadow-none mb-2"
            />
            <Form.Control
              rows={7}
              as="textarea"
              value={postForm.content}
              className="col-12 shadow-none"
              placeholder="What's on your mind..."
              onChange={(e) => handleUpdateForm("content", e)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button className="col-12 col-lg-2 btn-cancel" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="col-12 col-lg-2 btn-success text-white"
            onClick={ConfirmModifyForm}
          >
            {buttonConfirmLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostFormModal;
