import { Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import { NotFound } from "../pages/notFound/NotFound";
import { ProductPage } from "../pages/productPage/ProductPage";
import { PlantsPage } from "../pages/plantsPage/PlantsPage";
import { CartPage } from "../pages/cartPage/CartPage";
import { CheckOut } from "../pages/checkOut/CheckOut";

const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<NotFound />} />
    <Route path="/plants/:id" element={<ProductPage />} />
    <Route path="/plants/all-plants" element={<PlantsPage />} />
    <Route path="/plants/all-plants/:category" element={<PlantsPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/check-out" element={<CheckOut />} />
  </>
);

export default routes;
