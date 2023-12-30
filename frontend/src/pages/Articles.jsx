import React from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";
import Footer from "../components/Footer";
import FooterMobile from "../components/FooterMobile";
import ArticlesContent from "../components/Articles/ArticlesContent";

export const Articles = () => {

    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: 393 });
    const isTablet = useMediaQuery({ minWidth: 394, maxWidth: 834 });


    return (
        <>
            {isMobile ? (
                <NavbarMobile />
            ) : isTablet ? (
                <NavbarMobile />
            ) : (
                <Navbar />
            )}
            <ArticlesContent />
            {isMobile ? (
                <FooterMobile />
            ) : isTablet ? (
                <Footer />
            ) : (
                <Footer />
            )}
        </>
    );
};
