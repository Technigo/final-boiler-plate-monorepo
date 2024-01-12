import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes/routes';
import { Fade } from 'react-awesome-reveal';
import './App.css';

export const App = () => {
  useEffect(() => {
    // When the component mounts, create a preconnect link element
    const preconnectLink = document.createElement('link');

    // Set the relationship of the link to 'preconnect'
    preconnectLink.rel = 'preconnect';

    // Set the href attribute to the URL of the origin you want to preconnect to
    preconnectLink.href = 'https://tuanis-surf.netlify.app/';

    // Append the preconnect link to the head of the document
    document.head.appendChild(preconnectLink);

    // Clean up the link when the component unmounts to avoid memory leaks
    return () => {
      document.head.removeChild(preconnectLink);
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <>
      <BrowserRouter>
        <main>
          <Fade>
            <Routes>{routes}</Routes>
          </Fade>
        </main>
      </BrowserRouter>
    </>
  );
};
