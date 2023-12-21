import { Button } from "../buttons";
import { useState } from "react";

// Displays the plant details and a button to add/remove from the wishlist
// Handle the button click to send a request to the backend.
export const Wishlist = () => {
    const [isLiked, setIsLiked] = useState()

    const handleToggleLike = () => {
        
    }


  return (
    <div>
      <p>{isLiked ? "Added to Wishlist" : "Add to Wishlist"}</p>
      <button onClick={handleToggleLike}>
        {isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    </div>
  );
};

// Handling API Requests
// fetch API to send requests to your Express backend.
// Create an API endpoint for adding/removing plants from the wishlist.
