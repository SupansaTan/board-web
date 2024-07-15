import PostFormModal from "@/components/post-form-modal";
import PostListComponent from "@/components/post-list";
import SearchBarComponent from "@/components/search-bar";
import { useState } from "react";

export default function BlogPage() {
  const [showPostFormModal, setShowPostFormModal] = useState(false);
  const handleCloseModal = () => setShowPostFormModal(false);
  const handleShowModal = () => setShowPostFormModal(true);

  return (
    <div className="col-12 bg-light-grey h-100">
      <div className="container">
        <SearchBarComponent handleShowPostModal={handleShowModal} />
        <PostFormModal
          show={showPostFormModal}
          handleClose={handleCloseModal}
        />
        <PostListComponent />
      </div>
    </div>
  );
}
