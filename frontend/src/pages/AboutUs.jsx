import React from "react";
import { useMediaQuery } from "react-responsive";
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";
import Header from "../components/Header";
import HeaderMobile from "../components/HeaderMobile";
import AboutUsInfo from "../components/Aboutus/AboutUsInfo";
import WhoAreWe from "../components/Aboutus/WhoAreWe";
import Footer from "../components/Footer";
import FooterMobile from "../components/FooterMobile";

export const AboutUs = () => {

    const isMobile = useMediaQuery({ maxWidth: 393 });
    const isTablet = useMediaQuery({ minWidth: 394, maxWidth: 834 });

    return (
        <div>
            {isMobile ? (
                <NavbarMobile />
            ) : isTablet ? (
                <NavbarMobile />
            ) : (
                <Navbar />
            )}
            {isMobile ? (
                <HeaderMobile />
            ) : isTablet ? (
                <Header />
            ) : (
                <Header />
            )}
            <AboutUsInfo />
            <WhoAreWe />
            {isMobile ? (
                <FooterMobile />
            ) : isTablet ? (
                <Footer />
            ) : (
                <Footer />
            )}
        </div>
    );
};
