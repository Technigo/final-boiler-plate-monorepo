import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { Footer } from "./components/Footer";
import "./App.css";
import { Navbar } from "./components/Header/Navbar";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <main>
          <Navbar />
          <Routes>{routes}</Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </>
  );
};
