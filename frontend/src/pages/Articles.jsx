import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Articles = () => {

    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <Header />
            <Footer />
        </>
    );
};
