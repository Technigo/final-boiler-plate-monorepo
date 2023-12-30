import React from "react";
import { useMediaQuery } from "react-responsive";
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";
import Header from "../components/Header";
import HeaderMobile from "../components/HeaderMobile";
import LoginForm from "../components/Startpage/LoginForm";
import HowItWorks from "../components/Startpage/HowItWorks";
import WhyHabit from "../components/Startpage/WhyHabit";
import ArticlesFront from "../components/Startpage/ArticlesFront";
import Footer from "../components/Footer";


export const Startpage = () => {

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
      {isMobile ? (
        <HeaderMobile />
      ) : isTablet ? (
        <Header />
      ) : (
        <Header />
      )}
      <LoginForm />
      <HowItWorks />
      <WhyHabit />
      <ArticlesFront />
      <Footer />
    </>
  );
};
