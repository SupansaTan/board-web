import { useRootState } from "@/utils/context/RootStateContext";
import PostDetailComponent from "./post-detail";
import { IPostInfo } from "@/models/post.model";
import { useEffect, useState } from "react";

const PostListComponent: React.FC = () => {
  const { state } = useRootState();
  const [postList, setPostList] = useState<IPostInfo[]>([]);

  useEffect(() => {
    setPostList(state.post.postList);
  }, [state.post.postList]);

  const AnyPost = () => {
    return <p className="text-center">No post</p>;
  };

  return (
    <div className="row row-cols-1 px-2">
      {postList.length < 1 && <AnyPost />}
      {postList.length > 0 &&
        postList.map((post: IPostInfo, i: number) => {
          return <PostDetailComponent key={`post-detail-${i}`} post={post} />;
        })}
    </div>
  );
};

export default PostListComponent;
