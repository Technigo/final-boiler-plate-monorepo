import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { Navbar } from "./layout/Navbar"; // Make sure the import path is correct
import "./App.css";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar /> {/* This will place the Navbar at the top */}
        <main>
          <Routes>{routes}</Routes>
        </main>
      </BrowserRouter>
    </>
  );
};
