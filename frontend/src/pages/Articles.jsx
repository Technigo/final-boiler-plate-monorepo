import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ArticlesContent from "../components/Articles/ArticlesContent";

export const Articles = () => {

    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <ArticlesContent />
            <Footer />
        </>
    );
};
