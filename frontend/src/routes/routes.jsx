import { Route } from "react-router-dom";
import { MyPage } from "../pages/MyPage";
import { Register } from "../pages/Register";
import { Tasks } from "../pages/Tasks";
import { Startpage } from "../pages/Startpage";
import { AboutUs } from "../pages/AboutUs";
import { Articles } from "../pages/Articles";
import { NotFound } from "../pages/NotFound";


const routes = (
  <>
    <Route path="/" element={<Startpage />} />
    <Route path="/mypage" element={<MyPage />} />
    <Route path="/tasks" element={<Tasks />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<NotFound />} />
    <Route path="/aboutus" element={<AboutUs />} />
    <Route path="/articles" element={<Articles />} />
  </>
);

export default routes;