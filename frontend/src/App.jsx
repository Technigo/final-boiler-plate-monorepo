import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutPage from './components/about';
import Mood from './components/mood';
import Occasion from './components/occasion';
import ResultPage from './components/result';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
         <Route path="/occasion" element={<Occasion />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/result" element={<ResultPage />} /> 
          <Route path="/about" element={<AboutPage />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
