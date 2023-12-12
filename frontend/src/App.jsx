import { BrowserRouter, Routes, Link } from "react-router-dom";
// import routes from "./routes/routes";
import { PostStory } from "./components/PostStory/PostStory.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import "./App.css";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <main>
          {/* <Routes>{routes}</Routes> */}

          {/* KOMMENTERA IN ROUTES OCH ÄVEN IMORTEN */}
          {/* <Routes>{routes}</Routes> */}
        </main>
        <PostStory />
        <Footer />
      </BrowserRouter>
    </>
  );
};
