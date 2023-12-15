// Import the 'React' library.
import React from "react";
import lottie from "lottie-react";
// import animationData from "./src/assets/Animation404.json";

// Define the 'NotFound' functional component.
export const NotFound = () => {
  // Render a div element with a CSS class 'not-found' containing the Lottie animation.
  return (
    <div className="not-found">
      <lottie animationData={Animation404} />
    </div>
  );
};
