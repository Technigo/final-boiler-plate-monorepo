import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { Footer } from "./components/footer";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

export const App = () => {


  return (
    <>
      <BrowserRouter>
        <main>
          <Navbar />
          <Routes>{routes}</Routes>
          <Hero />
          <Footer />
        </main>
      </BrowserRouter>
    </>
  );
};
