import React from "react";
import { useMediaQuery } from "react-responsive";
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";
import Header from "../components/Header";
import AboutUsInfo from "../components/Aboutus/AboutUsInfo";
import WhoAreWe from "../components/Aboutus/WhoAreWe";
import Footer from "../components/Footer";

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
            <Header />
            <AboutUsInfo />
            <WhoAreWe />
            <Footer />
        </div>
    );
};
