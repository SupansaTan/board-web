import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const BackToPreviousPageButton: React.FC = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="d-flex mt-3 mx-2">
      <div
        className="rounded-circle bg-light-green text-dark-green cursor-pointer my-3"
        style={{
          paddingLeft: "14px",
          paddingRight: "14px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
        onClick={handleBack}
      >
        <FontAwesomeIcon icon={faArrowLeft} fontSize="20px" />
      </div>
    </div>
  );
};

export default BackToPreviousPageButton;
