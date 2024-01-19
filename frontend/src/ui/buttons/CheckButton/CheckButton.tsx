import { LuBookmark } from "react-icons/lu";
import { IoBookmark } from "react-icons/io5";
export const CheckButton = ({
  handleCheck,
  color,
  size,
  isChecked,
}: {
  handleCheck: () => void;
  color?: string;
  size?: string;
  isChecked?: boolean;
}) => {
  const ButtonType = isChecked ? IoBookmark : LuBookmark;
  return (
    <button className=" text-red-dark" onClick={handleCheck}>
      <ButtonType color={color} fontSize={size} />
    </button>
  );
};
