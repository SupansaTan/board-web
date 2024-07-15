import { IComment } from "@/models/comment.model";
import Avatar from "react-avatar";

interface Props {
  comment: IComment;
}

const CommentDetailComponent: React.FC<Props> = ({ comment }) => {
  return (
    <div className="row">
      <div className="col-auto px-1">
        <Avatar name={comment.commentBy} size="30" round={true} />
      </div>
      <div className="col ps-2">
        <div className="mt-1 mb-2">
          <span className="me-2 fw-bold text-color">{comment.commentBy}</span>
          <span className="text-dark-grey"></span>
        </div>
        <p>{comment.comment}</p>
      </div>
    </div>
  );
};

export default CommentDetailComponent;
