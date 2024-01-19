import { RiDeleteBin3Line } from "react-icons/ri";
export const DeleteBtn = ({
  handleDelete,
  color,
  size,
}: {
  handleDelete: () => void;
  color?: string;
  size?: string;
}) => {
  return (
    <button className=" text-red-dark" onClick={handleDelete}>
      <RiDeleteBin3Line color={color} fontSize={size} className={`${size} ${color}`} />
    </button>
  );
};
