import { CiEdit } from "react-icons/ci";
export const EditBtn = ({
  handleEdit,
  color,
  size,
}: {
  handleEdit: () => void;
  color?: string;
  size?: string;
}) => {
  return (
    <button className="w-fit text-end text-xl text-gray-500" onClick={handleEdit}>
      <CiEdit className={`${size ?? ""} ${color ?? ""}`} />
    </button>
  );
};
