import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import NavigateHandler from "../src/utils/NavigateHandler";


export const App = () => {

  return (
    <>
     <BrowserRouter>
        <NavigateHandler>
          <main>
            <Routes>{routes}</Routes>
          </main>
        </NavigateHandler>
      </BrowserRouter>
    </>
  );
};