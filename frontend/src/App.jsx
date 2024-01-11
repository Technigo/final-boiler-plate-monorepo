// Entry point of the React application using React Router for navigation

import "./App.css";

import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";

import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";


export const App = () => {
  return (
    <>
      <BrowserRouter>
        <main>
          <Header />
          <Routes>{routes}</Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </>
  );
};
