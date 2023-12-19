import { BrowserRouter, Routes, Link } from "react-router-dom";
import routes from "./routes/routes";
import { Header } from "./components/header/Header";
import { Banner } from "./components/banner/Banner";

export const App = () => {
  return (
    <>
      <BrowserRouter>
      <Header />
        <main>
          <Banner />
          {/* <Routes>{routes}</Routes> */}
          {/* <Routes>{routes}</Routes> */}
        </main>
      </BrowserRouter>
    </>
  );
};
