import { BrowserRouter } from "react-router-dom";
import routes from "./routes/routes";
import ReactFluidAnimation from "@usertive/react-fluid-animation";
import "./App.css";

export const App = () => {
  return (
    <>
      <ReactFluidAnimation />
      <BrowserRouter>
        <main>{routes}</main>
      </BrowserRouter>
    </>
  );
};
