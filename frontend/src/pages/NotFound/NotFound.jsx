// Import the 'React' library.
import React from "react";
import lottie from "lottie-react";
import Animation404 from "./src/assets/Animation404.json";

// Define the 'NotFound' functional component.
export const NotFound = () => {
  // Render a div element with a CSS class 'not-found' containing the text 'NotFound'.
  return (
    <div className="not-found">
      <Lottie Animation={Animation404} />
    </div>
  );
};
