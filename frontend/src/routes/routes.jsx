import { Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";
import { Login } from "../pages/Login/Login";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";
import { PlaygroundDetails } from "../pages/Playgrounddetails/PlaygroundDetails";
import { MyFavorites } from "../pages/MyFavorites/MyFavorites";

const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/playground/:id" element={<PlaygroundDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="/secretpage" element={<MyFavorites />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<ErrorPage />} />
  </>
);

export default routes;


