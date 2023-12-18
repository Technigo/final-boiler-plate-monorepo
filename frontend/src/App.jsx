import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { TripGenerator } from "./components/TripGenerator";
import { Navbar } from "./components/Navbar";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <main>
          <Navbar />
          <Routes>{routes}</Routes>
        </main>
      </BrowserRouter>
    </>
  );
};
