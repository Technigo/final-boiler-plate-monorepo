import { BrowserRouter, Routes, Link } from "react-router-dom";
import routes from "./routes/routes";
import { TripGenerator } from "./components/TripGenerator";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <main>
          {/* <Routes>{routes}</Routes> */}
          <Routes>{routes}</Routes>
          <TripGenerator />
        </main>
      </BrowserRouter>
    </>
  );
};
