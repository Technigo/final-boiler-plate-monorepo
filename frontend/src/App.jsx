import { BrowserRouter, Routes, Link } from "react-router-dom";
import routes from "./routes/routes";
import { Navbar } from "./components/Navbar";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <main>
          {/* <Routes>{routes}</Routes> */}
          <Navbar />
          <Routes>{routes}</Routes>
        </main>
      </BrowserRouter>
    </>
  );
};
