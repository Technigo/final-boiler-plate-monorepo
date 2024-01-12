import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Like = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <button onClick={handleLike}>
      {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  );
};

export default Like;
