import { IComment } from "@/models/comment.model";
import CommentDetailComponent from "./comment-detail";

interface Props {
  comments: IComment[];
}

const CommentListComponent: React.FC<Props> = ({ comments }) => {
  return (
    <div className="row row-cols-1 p-3">
      {comments.map((c: IComment, i: number) => {
        return (
          <CommentDetailComponent key={`cooment-detail-${i}`} comment={c} />
        );
      })}
    </div>
  );
};

export default CommentListComponent;
