import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NotFoundPage from "../components/NotFoundPage";

// Define the 'NotFound' functional component.
export const NotFound = () => {
  // Render a div element with a CSS class 'not-found' containing the text 'NotFound'.
  return <div>

    <Navbar />
    <NotFoundPage />
    <Footer />

  </div>;
};
