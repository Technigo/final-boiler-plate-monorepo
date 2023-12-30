import React from "react";
import { useMediaQuery } from "react-responsive";
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";
import Footer from "../components/Footer";
import FooterMobile from "../components/FooterMobile";
import NotFoundPage from "../components/NotFoundPage";

export const NotFound = () => {

  const isMobile = useMediaQuery({ maxWidth: 393 });
  const isTablet = useMediaQuery({ minWidth: 394, maxWidth: 834 });

  return <div>

    {isMobile ? (
      <NavbarMobile />
    ) : isTablet ? (
      <NavbarMobile />
    ) : (
      <Navbar />
    )}

    <NotFoundPage />

    {isMobile ? (
      <FooterMobile />
    ) : isTablet ? (
      <Footer />
    ) : (
      <Footer />
    )}

  </div>;
};
