import { IComment } from "@/models/comment.model";
import CommentDetailComponent from "./comment-detail";
import { useRootState } from "@/utils/context/RootStateContext";
import { useEffect, useState } from "react";

interface Props {
  comments: IComment[];
}

const CommentListComponent: React.FC<Props> = ({ comments }) => {
  return (
    <div className="row row-cols-1 px-2">
      {comments.map((c: IComment) => {
        return <CommentDetailComponent comment={c} />;
      })}
    </div>
  );
};

export default CommentListComponent;
