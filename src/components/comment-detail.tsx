import { IComment } from "@/models/comment.model";
import Avatar from "react-avatar";

interface Props {
  comment: IComment;
}

const CommentDetailComponent: React.FC<Props> = ({ comment }) => {
  return (
    <div className="row">
      <div className="col-auto">
        <Avatar name={comment.postBy} size="30" round={true} />
      </div>
      <div className="col">
        <div className="mb-3">
          <span className="me-2 fw-bold text-color">{comment.postBy}</span>
          <span className="text-dark-grey">
            {comment.createDate.toUTCString()}
          </span>
        </div>
        <p>{comment.comment}</p>
      </div>
    </div>
  );
};

export default CommentDetailComponent;
