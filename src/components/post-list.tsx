import { useRootState } from "@/utils/context/RootStateContext";
import PostDetailComponent from "./post-detail";
import { IPostInfo } from "@/models/post.model";

const PostListComponent: React.FC = () => {
  const { state } = useRootState();
  const postList = Array.isArray(state.post.postList)
    ? state.post.postList
    : [];

  return (
    <div className="row row-cols-1 px-2">
      {postList.map((post: IPostInfo, i: number) => {
        return <PostDetailComponent key={`post-detail-${i}`} post={post} />;
      })}
    </div>
  );
};

export default PostListComponent;
