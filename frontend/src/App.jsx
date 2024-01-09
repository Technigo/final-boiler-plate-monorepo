import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";


export const App = () => {

  return (
    <>
     <BrowserRouter>
          <main>
            <Routes>{routes}</Routes>
          </main>
      </BrowserRouter>
    </>
  );
};