import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Like = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    // Update this function to handle liking in the future (e.g., saving to a database). 
    // Adding something like "log-in to like this" if the user is not currently logged in
    setIsLiked((prev) => !prev);
  };

  return (
    <button onClick={handleLike}>
      {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  );
};

export default Like;
