import {
  faComment,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IBM_Plex_Sans_Thai, Inter } from "next/font/google";
import { getPluralizedWord } from "@/utils/pluralize";
import { Community } from "@/enum/community.enum";
import { IPostInfo } from "@/models/post.model";
import TextTruncate from "react-text-truncate";
import Avatar from "react-avatar";
import ConfirmRemovePostModal from "./confirm-remove-post-modal";
import PostFormModal from "./post-form-modal";
import { useState } from "react";
import { useRouter } from "next/router";

const IBMPlexSans = IBM_Plex_Sans_Thai({
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
});

interface Props {
  post: IPostInfo;
}

interface PostFormModalProps {
  show: boolean;
  postInfo?: IPostInfo;
}

interface ConfirmDeleteModalProps {
  show: boolean;
  postId: string;
}

const PostDetailComponent: React.FC<Props> = ({ post }) => {
  const [postForm, setPostForm] = useState<PostFormModalProps>({ show: false });
  const [confirmDeleteModal, setConfirmDeleteModal] =
    useState<ConfirmDeleteModalProps>({ show: false, postId: "" });
  const router = useRouter();
  const cannotEditPostPage = ["/blog"];
  const isShowModifyButton = !cannotEditPostPage.includes(router.pathname);

  const handleShowEditModal = (postInfo: IPostInfo) => {
    setPostForm({ show: true, postInfo: postInfo });
  };
  const handleShowConfirmDeleteModal = (postId: string) => {
    setConfirmDeleteModal({ show: true, postId: postId });
  };

  const handleCloseShowEditModal = () => setPostForm({ show: false });
  const handleCloseConfirmDeleteModal = () =>
    setConfirmDeleteModal({ show: false, postId: "" });

  const routeToPostDetail = (postId: string) => {
    router.push(`/blog/${postId}`, undefined, { shallow: true });
  };

  const ModifyButton = () => {
    return (
      <div>
        <a
          className="cursor-pointer text-green"
          onClick={() => handleShowEditModal(post)}
        >
          <FontAwesomeIcon icon={faEdit} className="me-3" />
        </a>
        <a
          className="cursor-pointer text-green"
          onClick={() => handleShowConfirmDeleteModal(post.postId)}
        >
          <FontAwesomeIcon icon={faTrashCan} className="me-2" />
        </a>
      </div>
    );
  };

  return (
    <div className="post-detail-card col bg-white p-3">
      <div className="col-12 text-dark-grey mt-1 mb-2 d-flex justify-content-between">
        <div>
          <Avatar name={post.createBy} size="30" round={true} />
          <span className="ms-2">{post.createBy}</span>
        </div>
        {isShowModifyButton && <ModifyButton />}
      </div>

      <div className="col-12">
        <span
          className={`col-auto badge rounded-pill px-2 mb-2 ${IBMPlexSans.className}`}
          style={{ backgroundColor: "#f3f3f3", color: "#4a4a4a" }}
        >
          {getCommunityLabel(post.community)}
        </span>
      </div>

      <div
        className="col-12 cursor-pointer"
        onClick={() => routeToPostDetail(post.postId)}
      >
        <TextTruncate
          line={2}
          element="h5"
          truncateText="…"
          style={{ color: "#101828" }}
          className={`${inter.className} mb-1`}
          text={post.postTitle}
        />
        <TextTruncate
          line={2}
          element="span"
          truncateText="…"
          style={{ color: "#101828" }}
          className={`${inter.className}`}
          text={post.content}
        />
      </div>

      <div
        className="col-12 text-dark-grey mt-2 cursor-pointer"
        onClick={() => routeToPostDetail(post.postId)}
      >
        <FontAwesomeIcon icon={faComment} className="me-2" />
        <span className="me-1">{post.totalComments}</span>
        <span>{getPluralizedWord(post.totalComments, "Comment")}</span>
      </div>

      {/* modal */}
      <PostFormModal
        show={postForm.show}
        postInfo={postForm.postInfo}
        handleClose={handleCloseShowEditModal}
      />
      <ConfirmRemovePostModal
        show={confirmDeleteModal.show}
        postId={confirmDeleteModal.postId}
        handleClose={handleCloseConfirmDeleteModal}
      />
    </div>
  );
};

const getCommunityLabel = (communityType: number | Community) => {
  switch (communityType) {
    case Community.History:
      return "History";
    case Community.Food:
      return "Food";
    case Community.Pets:
      return "Pets";
    case Community.Health:
      return "Health";
    case Community.Fashion:
      return "Fashion";
    case Community.Exercise:
      return "Exercise";
    case Community.Others:
      return "Others";
  }
};

export default PostDetailComponent;
