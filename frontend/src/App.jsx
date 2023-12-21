import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { TripGenerator } from "./components/TripGenerator";
import { Footer } from "./components/footer";


export const App = () => {
  return (
    <>
      <BrowserRouter>
        <main>
          {/* <Routes>{routes}</Routes> */}
          <Routes>{routes}</Routes>
          <TripGenerator />
          <Footer/>
        </main>
      </BrowserRouter>
    </>
  );
};
