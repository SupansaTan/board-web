import { Community } from "@/enum/community.enum";
import { getEnumEntries } from "@/utils/getEnumEntries";
import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Props {
  className: string;
  placeholder: string;
  communityState: Community | number;
  handleSelected: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const CommunityDropdown: React.FC<Props> = ({
  className,
  placeholder,
  communityState,
  handleSelected,
}) => {
  return (
    <Form.Select
      className={`${className} shadow-none cursor-pointer`}
      aria-label="dropdown-community"
      value={communityState}
      onChange={handleSelected}
    >
      <option value={0}>{placeholder}</option>
      <CommunityOptions />
    </Form.Select>
  );
};

const CommunityOptions: React.FC = () => {
  return getEnumEntries(Community).map(([key, value]: [string, number]) => {
    return (
      <option key={`community-options-${value}`} value={value}>
        {key}
      </option>
    );
  });
};

export default CommunityDropdown;
