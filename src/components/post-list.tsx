import { useRootState } from "@/utils/context/RootStateContext";
import PostDetailComponent from "./post-detail";
import { IPostInfo } from "@/models/post.model";

const PostListComponent: React.FC = () => {
  const { state } = useRootState();
  return (
    <div className="row row-cols-1 px-2">
      {state.post.postList.map((post: IPostInfo) => {
        return <PostDetailComponent post={post} />;
      })}
    </div>
  );
};

export default PostListComponent;
