// Entry point of the React application using React Router for navigation

import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import "./App.css";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
// import dotenv from "dotenv";

// dotenv.config();

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <main>
          <Header/>
          <Routes>{routes}</Routes>
          <Footer/>
        </main>
      </BrowserRouter>
    </>
  );
};
