import { BrowserRouter } from "react-router-dom";
import routes from "./routes/routes";
import "./App.css";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <main>
          {routes}
        </main>
      </BrowserRouter>
    </>
  );
};
