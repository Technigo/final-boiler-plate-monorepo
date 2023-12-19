import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import LoginForm from "../components/Startpage/LoginForm";
import HowItWorks from "../components/Startpage/HowItWorks";
import WhyHabit from "../components/Startpage/WhyHabit";
import ArticlesFront from "../components/Startpage/ArticlesFront";
import Footer from "../components/Footer";


export const Startpage = () => {

  return (
    <>
      <Navbar />
      <Header />
      <LoginForm />
      <HowItWorks />
      <WhyHabit />
      <ArticlesFront />
      <Footer />
    </>
  );
};
