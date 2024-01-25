import React from "react";
import { useMediaQuery } from "react-responsive";
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";
import Header from "../components/Header";
import HeaderMobile from "../components/HeaderMobile";
import LoginForm from "../components/Startpage/LoginForm";
import HowItWorks from "../components/Startpage/HowItWorks";
import HowItWorksMobile from "../components/Startpage/HowItWorksMobile";
import WhyHabit from "../components/Startpage/WhyHabit";
import WhyHabitMobile from "../components/Startpage/WhyHabitMobile";
import ArticlesFront from "../components/Startpage/ArticlesFront";
import ArticlesFrontTablet from "../components/Startpage/ArticlesFrontTablet";
import ArticlesFrontMobile from "../components/Startpage/ArticlesFrontMobile";
import Footer from "../components/Footer";
import FooterMobile from "../components/FooterMobile";
import "../components/header.css";

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


      {isMobile ? (
        <HowItWorksMobile />
      ) : isTablet ? (
        <HowItWorksMobile />
      ) : (
        <HowItWorks />
      )}


      {isMobile ? (
        <WhyHabitMobile />
      ) : isTablet ? (
        <WhyHabitMobile />
      ) : (
        <WhyHabit />
      )}

      {isMobile ? (
        <ArticlesFrontMobile />
      ) : isTablet ? (
        <ArticlesFrontTablet />
      ) : (
        <ArticlesFront />
      )}

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
