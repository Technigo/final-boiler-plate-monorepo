import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutPage from './components/about';
import Mood from './components/mood';
import Occasion from './components/occasion';
import ResultPage from './components/result';
import AddRestaurantForm from './components/addRestaurantForm'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
         <Route path="/occasion" element={<Occasion />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/result" element={<ResultPage />} /> 
          <Route path="/about" element={<AboutPage />} />
          <Route path="/add-restaurant" element={<AddRestaurantForm />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
