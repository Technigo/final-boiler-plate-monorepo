import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import AboutUsInfo from "../components/Aboutus/AboutUsInfo";
import WhoAreWe from "../components/Aboutus/WhoAreWe";
import Footer from "../components/Footer";

export const AboutUs = () => {

    return (
        <div>
            <Navbar />
            <Header />
            <AboutUsInfo />
            <WhoAreWe />
            <Footer />
        </div>
    );
};
