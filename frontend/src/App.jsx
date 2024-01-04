import routes from "./routes/routes";
import { BrowserRouter, Routes, useNavigate } from "react-router-dom";
import { TripGenerator } from "./components/TripGenerator";
import { Footer } from "./components/footer";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

export const App = () => {
  const navigateToHome = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
    }
  };
  return (
    <>
      <BrowserRouter>
        <main>
          {/* {window.location.pathname !== "/" && <Navbar />} */}
          <Navbar />
          <Routes>{routes}</Routes>
          {/* <TripGenerator /> */}
          {window.location.pathname !== "/" && <Hero />}
          <Footer />
        </main>
      </BrowserRouter>
    </>
  );
};
