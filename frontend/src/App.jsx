import React from "react";
import GlobalFonts from "./fonts/font";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wrapper from "./components/wrapper";
import Home from "./components/Home";
import AboutPage from "./components/about";
import MoodSelector from "./components/mood";
import OccasionSelector from "./components/occasion";
import ResultsComponent from "./components/result";
import AddRestaurantForm from "./components/addRestaurantForm";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body { 
  font-family: 'Mercusaur';
  font-family: 'JosefinSans';
}`;

const App = () => {
  return (
    <BrowserRouter>
       <Wrapper>
        <GlobalFonts />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/occasion" element={<OccasionSelector />} />
          <Route path="/mood" element={<MoodSelector />} />
          <Route path="/result" element={<ResultsComponent />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/addrestaurant" element={<AddRestaurantForm />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};

export default App;
