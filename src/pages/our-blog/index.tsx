import PostFormModal from "@/components/post-form-modal";
import PostListComponent from "@/components/post-list";
import SearchBarComponent from "@/components/search-bar";
import { useState } from "react";

export default function BlogPage() {
  const [showPostFormModal, setShowPostFormModal] = useState(false);
  const handleCloseModal = () => setShowPostFormModal(false);
  const handleShowModal = () => setShowPostFormModal(true);

  return (
    <>
      <SearchBarComponent handleShowPostModal={handleShowModal} />
      <PostFormModal show={showPostFormModal} handleClose={handleCloseModal} />
      <PostListComponent />
    </>
  );
}
