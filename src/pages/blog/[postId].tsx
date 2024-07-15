import CommentFormModal from "@/components/comment-form-modal";
import CommentListComponent from "@/components/comment-list";
import PostDetailComponent from "@/components/post-detail";
import BackToPreviousPageButton from "@/components/previous-page-btn";
import { IAddCommentRequest } from "@/models/comment.model";
import { IPostInfo } from "@/models/post.model";
import { getAccessToken } from "@/utils/auth/accessTokenHelper";
import { useLoading } from "@/utils/context/LoadingContext";
import { useRootState } from "@/utils/context/RootStateContext";
import { ToastState } from "@/utils/reducer/toastReducer";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { isMobile, isTablet } from "react-device-detect";

export default function BlogDetailPage() {
  const router = useRouter();
  const postId = router.query.postId?.toString() ?? "";

  const [postInfo, setPostInfo] = useState<IPostInfo>();
  const [showAddCommentModal, setShowAddCommentModal] =
    useState<boolean>(false);
  const [isShowCommentInput, setShowCommentInput] = useState<boolean>(false);

  const { setLoading } = useLoading();
  const { dispatch } = useRootState();

  const fetchPostInfo = async (postId: string) => {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    if (result.statusCode === 200) {
      setLoading(false);
      setPostInfo(result.data);
    } else {
      setLoading(false);
      const toastInfo: ToastState = {
        showToast: true,
        variant: "danger",
        message: `Faild to fetch comment`,
      };
      dispatch({ type: "toast/set", payload: toastInfo });
      dispatch({ type: "post/setNeedToFetch", isNeedToFetch: false });
    }
  };

  const addComment = async (comment: string) => {
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
      fetchPostInfo(postId);
      setShowCommentInput(false);
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

    dispatch({ type: "post/setNeedToFetch", isNeedToFetch: true });
    dispatch({ type: "toast/set", payload: toastInfo });
  };

  useEffect(() => {
    if (postId) {
      fetchPostInfo(postId);
    }
  }, [postId]);

  const AddCommentButton: React.FC = () => {
    const handleShowComponentSection = () => {
      if (isMobile || isTablet) {
        setShowAddCommentModal(true);
      } else {
        setShowCommentInput(true);
      }
    };

    return (
      <Button className="btn-cancel mx-2" onClick={handleShowComponentSection}>
        Add Comments
      </Button>
    );
  };

  const CommentInputSection: React.FC = () => {
    const [comment, setComment] = useState<string>("");

    return (
      <div className="col p-3">
        <div className="row px-2">
          <Form.Control
            rows={4}
            as="textarea"
            value={comment}
            className="col-12 shadow-none"
            placeholder="What's on your mind..."
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="col-12 d-flex justify-content-end px-0">
            <Button
              className="col-12 col-lg-1 btn-cancel m-2"
              onClick={() => setShowCommentInput(false)}
            >
              Cancel
            </Button>
            <Button
              className="col-12 col-lg-1 btn-success text-white my-2"
              onClick={() => addComment(comment)}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="col-12 bg-white">
      <div className="container">
        <BackToPreviousPageButton />
        {postInfo && <PostDetailComponent post={postInfo} />}
        {!isShowCommentInput && <AddCommentButton />}
        {isShowCommentInput && <CommentInputSection />}
        <CommentListComponent comments={postInfo?.comments ?? []} />
      </div>

      {/* modal */}
      <CommentFormModal
        show={showAddCommentModal}
        postId={postId}
        handleClose={() => {
          setShowAddCommentModal(false);
          fetchPostInfo(postId);
        }}
      />
    </div>
  );
}
