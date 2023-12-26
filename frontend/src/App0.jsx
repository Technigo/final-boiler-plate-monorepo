import { BrowserRouter, Routes, Link } from "react-router-dom";
import routes from "./routes/routes";
import "./App.css";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <main>
          {/* <Routes>{routes}</Routes> */}
          <Routes>{routes}</Routes>
        </main>
      </BrowserRouter>
    </>
  );
};
