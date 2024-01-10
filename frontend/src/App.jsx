import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { Footer } from "./components/Footer";
import { GlobalStyle } from "./globalStyles";
import { Header } from "./components/Header/Header";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <main>
          <Routes>{routes}</Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};
