import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import HowItWorks from "../components/HowItWorks";
import WhyHabit from "../components/WhyHabit";
import ArticlesFront from "../components/ArticlesFront";
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
