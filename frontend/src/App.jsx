import React from "react";
import GlobalFonts from "./fonts/font";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wrapper from "./components/wrapper";
import Home from "./components/Home";
import AboutPage from "./components/about";
import MoodSelector from "./components/mood";
import ResultsComponent from "./components/result";
import AddRestaurantForm from "./components/addRestaurantForm";
import Suggestion from "./components/suggestion";
import styled, { createGlobalStyle } from "styled-components";
import Business from './components/occasions/business'; // Assuming you have this component created
import Celebration from './components/occasions/celebration'; // Assuming you have this component created
import Date from './components/occasions/date'; // Assuming you have this component created
import Family from './components/occasions/family'; // Assuming you have this component created
import Friends from './components/occasions/friends'; // Assuming you have this component created
import Other from './components/occasions/other';

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
          <Route path="/business" element={<Business />} />
          <Route path="/celebration" element={<Celebration />} />
          <Route path="/date" element={<Date />} />
          <Route path="/family" element={<Family />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/other" element={<Other />} />
          <Route path="/mood" element={<MoodSelector />} />
          <Route path="/result" element={<ResultsComponent />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/addrestaurant" element={<AddRestaurantForm />} />
          <Route path="/suggestion" element={<Suggestion />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};

export default App;