import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutPage from './components/about';
import MoodSelector from './components/mood';
import OccasionSelector from './components/occasion';
import ResultsComponent from './components/result';
import Suggestion from './components/suggestion';
import AddRestaurantForm from './components/addRestaurantForm';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/occasion" element={<OccasionSelector />} />
        <Route path="/mood" element={<MoodSelector />} />
        <Route path="/result" element={<ResultsComponent />} /> 
        <Route path="/about" element={<AboutPage />} />
        <Route path="/addrestaurant" element={<AddRestaurantForm />} />
        <Route path="/suggestion" element={<Suggestion />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
