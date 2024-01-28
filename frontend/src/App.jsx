import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import routes from "./routes/routes";
import AdminRoutes from "./routes/adminRoutes";
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";
import { Disclaimer } from "./components/Disclaimer";
import "./App.css";

export const App = () => {
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);

  useEffect(() => {
    const disclaimerAccepted = localStorage.getItem('disclaimerAccepted') === 'true';
    setIsDisclaimerAccepted(disclaimerAccepted);
  }, []);

  const handleAcceptDisclaimer = (accepted) => {
    localStorage.setItem('disclaimerAccepted', accepted);
    setIsDisclaimerAccepted(accepted);
  };

  return (
    <div className="app">
      {!isDisclaimerAccepted ? (
        <Disclaimer onAccept={handleAcceptDisclaimer} />
      ) : (
        <BrowserRouter>
          <Navbar />
          <main>
            <Routes>
              {routes} {/* Regular routes */}
              <Route path="/admin/*" element={<AdminRoutes />} /> {/* Admin routes */}
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
};

