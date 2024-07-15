import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRootState } from "@/utils/context/RootStateContext";
import { IGetPostListRequest } from "@/models/post.model";
import CommunityDropdown from "./community-dropdown";
import { Community } from "@/enum/community.enum";
import { Button, Form } from "react-bootstrap";

interface SearchBarComponentProps {
  handleShowPostModal: () => void;
}

const SearchBarComponent: React.FC<SearchBarComponentProps> = ({
  handleShowPostModal,
}) => {
  const [title, setTitle] = useState<string>("");
  const [community, setCommunity] = useState<Community | number>(0);
  const { dispatch } = useRootState();

  const handleChangeCommunity = (event: ChangeEvent<HTMLSelectElement>) => {
    setCommunity(Number(event.target.value));
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const fetchPost = useCallback(async () => {
    const searchTitle = title.length > 1 ? title : "";
    const request = new IGetPostListRequest(searchTitle, community, false);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/postList`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    const result = await response.json();
    dispatch({ type: "post/set", postList: result.data });
  }, [title, community]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <>
      <div className="row my-3">
        <div className="col position-relative">
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
