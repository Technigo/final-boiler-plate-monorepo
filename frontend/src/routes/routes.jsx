import { Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/NotFound/NotFound";
import { LandingPage } from "../pages/LandingPage/LandingPage";
import { AboutUs } from "../pages/AboutUs/AboutUs";
import { PostStory } from "../components/PostStory/PostStory";
import { StoryList } from "../components/StoryList/StoryList";
import { Carousel } from "../components/Carousel/Carousel";

const routes = (
  <Routes>
    <Route path="/" element={<LandingPage />}>
<<<<<<< HEAD
      <Route index element={<Carousel />} /> {/* Default content for Landingpage */}
=======
      <Route index element={<StoryList />} />{" "}
      {/* Default content for Landingpage */}
>>>>>>> main
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/post-story" element={<PostStory />} />
      <Route path="/story-list" element={<StoryList />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);
export default routes;
