import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArticlesFront from "../components/ArticlesFront";
import LoginForm from "../components/LoginForm"; // 

export const Login = () => {

  return (
    <>
      <Navbar />
      <Header />
      <LoginForm />
      <ArticlesFront />
      <Footer />
    </>
  );
};
