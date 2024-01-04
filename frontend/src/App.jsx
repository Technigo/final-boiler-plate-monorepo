import { BrowserRouter, Routes, Link } from "react-router-dom";
import routes from "./routes/routes";
import { Fade } from "react-awesome-reveal";
import "./App.css";


export const App = () => {
  return (
    <>

      <BrowserRouter>
        <main>
          {/* <Routes>{routes}</Routes> */}
          <Fade>
            <Routes>{routes}</Routes>
          </Fade>
        </main>
      </BrowserRouter>
    </>
  );
};
