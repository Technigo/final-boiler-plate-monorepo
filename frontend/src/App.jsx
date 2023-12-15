
import { BrowserRouter } from "react-router-dom";
import routes from "./routes/routes";

import { PostStory } from "./components/PostStory/PostStory.jsx";
import { AboutUs } from "./pages/AboutUs/AboutUs.jsx";
import { Footer } from "./components/Footer/Footer.jsx";



import "./App.css";

export const App = () => {
  return (
    <>
      <BrowserRouter>


        <main>

          <Routes>{routes}</Routes>

        
        </main>
        <PostStory />
        <AboutUs />
        <Footer />

 
        </main>



      </BrowserRouter>
    </>
  );
};
