import { BrowserRouter, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import routes from "./routes/routes";
import "./App.css";

export const App = () => {
  return (
    <>
      <BrowserRouter>
      <NavBar />
        <main>
          {/* <Routes>{routes}</Routes> */}
          <Routes>{routes}</Routes>
        </main>
      </BrowserRouter>
    </>
  );
};
