import { Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { NotFound } from "../pages/notFound/NotFound";
import { ProductPage } from "../pages/productPage/ProductPage";
import { PlantsPage } from "../pages/plantsPage/PlantsPage";
import { FavouritesPage } from "../pages/favouritesPage/FavouritesPage";
import { CartPage } from "../pages/cartPage/CartPage";
import { CheckOut } from "../pages/checkOut/CheckOut";
import { About } from "../pages/about/About";
import { InspoPage } from "../pages/inspoPage/InspoPage";
import { UserDashboard } from "../pages/account/UserDashboard";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";

const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/plants/:id" element={<ProductPage />} />
    <Route path="/plants/all-plants" element={<PlantsPage />} />
    <Route path="/plants/all-plants/:category" element={<PlantsPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/check-out" element={<CheckOut />} />
    <Route path="/about" element={<About />} />
    <Route path="/inspo" element={<InspoPage />} />
    <Route path="/dashboard" element={<UserDashboard />} />
    <Route path="/wishlist" element={<FavouritesPage />} />
    <Route path="*" element={<NotFound />} />
  </>
);

export default routes;
