
import { Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";
import { Tasks } from "../pages/Tasks";
import { Login } from "../pages/Login";
import { AboutUs } from "../pages/AboutUs";
import { NotFound } from "../pages/NotFound";


const routes = (
  <>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/tasks" element={<Tasks />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<NotFound />} />
    <Route path="/aboutus" element={<AboutUs />} />
  </>
);

export default routes;

