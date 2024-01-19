import { BiSolidAddToQueue } from "react-icons/bi";
export const AddBtn = ({
  handleEdit,
  color,
  size,
}: {
  handleEdit: () => void;
  color?: string;
  size?: string;
}) => {
  return (
    <button className="w-fit text-end text-xl text-gray-500 " onClick={handleEdit}>
      <BiSolidAddToQueue color={color} fontSize={size} />
    </button>
  );
};
