import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { Footer } from "./components/Footer";
import "./App.css";
import { Header } from "./components/Header/Header";
// import { Navbar } from "./components/Header/Navbar";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <main>
          {/* <Navbar /> */}
          <Header />
          <Routes>{routes}</Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </>
  );
};
