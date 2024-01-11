import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">
            <Navbar />
            <Routes>{routes}</Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};
