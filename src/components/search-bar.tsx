import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRootState } from "@/utils/context/RootStateContext";
import { IGetPostListRequest, IPostInfo } from "@/models/post.model";
import CommunityDropdown from "./community-dropdown";
import { Community } from "@/enum/community.enum";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { getAccessToken } from "@/utils/auth/accessTokenHelper";
import { IResponse } from "@/models/response.model";

interface SearchBarComponentProps {
  handleShowPostModal: () => void;
}

const SearchBarComponent: React.FC<SearchBarComponentProps> = ({
  handleShowPostModal,
}) => {
  const [title, setTitle] = useState<string>("");
  const [community, setCommunity] = useState<Community | number>(0);
  const { state, dispatch } = useRootState();
  const router = useRouter();

  const handleChangeCommunity = (event: ChangeEvent<HTMLSelectElement>) => {
    setCommunity(Number(event.target.value));
    dispatch({ type: "post/setNeedToFetch", isNeedToFetch: true });
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    dispatch({ type: "post/setNeedToFetch", isNeedToFetch: true });
  };

  const fetchPost = useCallback(async () => {
    const searchTitle = title.length > 1 ? title : "";
    const accessToken = getAccessToken();
    const isOnlyUserPost = ["/our-blog"].includes(router.pathname);
    const request = new IGetPostListRequest(
      searchTitle,
      community,
      isOnlyUserPost
    );

    if (state.post.isNeedToFetch) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/postList`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          body: JSON.stringify(request),
        }
      );

      const result: IResponse<IPostInfo[]> = await response.json();
      dispatch({ type: "post/setPost", postList: result.data });
      dispatch({ type: "post/setNeedToFetch", isNeedToFetch: false });
    }
  }, [state.post.isNeedToFetch]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <>
      <div className="row mb-3 pt-3">
        <div className="col-12 mb-2 col-md mb-md-0 position-relative">
          <Form.Control
            type="text"
            id="search-bar"
            value={title}
            onChange={handleChangeTitle}
            style={{ paddingLeft: "40px" }}
            className="search-input shadow-none"
          />
          <FontAwesomeIcon
            icon={faSearch}
            color="#5b5b5b"
            size="1x"
            style={{ left: "35px" }}
            className="position-absolute top-50 translate-middle"
          />
        </div>

        <div className="col-auto ps-0">
          <CommunityDropdown
            className="dropdown-community border-0"
            placeholder="Community"
            communityState={community}
            handleSelected={handleChangeCommunity}
          />
        </div>

        <div className="col-auto ps-0">
          <Button
            className="btn-success text-white px-3"
            onClick={handleShowPostModal}
          >
            <span className="me-1">Create</span>
            <FontAwesomeIcon icon={faPlus} color="white" fontSize={"12px"} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchBarComponent;
