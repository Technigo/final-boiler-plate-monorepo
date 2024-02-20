import { Routes, useLocation } from "react-router-dom";
import routes from "./routes/routes";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";

export const App = () => {
  const location = useLocation();
  const hideFooterOnRoutes = ["/login", "/register"]; // Add the routes where you want to hide the footer

  return (
    <>
      <Header />
      <main>
        <Routes>{routes}</Routes>
      </main>
      {!hideFooterOnRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};
