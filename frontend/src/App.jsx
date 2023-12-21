import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { TripGenerator } from "./components/TripGenerator";
<<<<<<< HEAD
import { Footer } from "./components/footer";

=======
import { Navbar } from "./components/Navbar";
>>>>>>> 7554e0c8314f0d6f2f4c46ac8b181ff56fcc91c9

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <main>
          <Navbar />
          <Routes>{routes}</Routes>
<<<<<<< HEAD
          <TripGenerator />
          <Footer/>
=======
>>>>>>> 7554e0c8314f0d6f2f4c46ac8b181ff56fcc91c9
        </main>
      </BrowserRouter>
    </>
  );
};
