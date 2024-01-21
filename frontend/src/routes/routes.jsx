import { Route } from "react-router-dom";
import { HomePage } from "../pages/homePage/HomePage";
import { NotFoundPage } from "../pages/notFoundPage/NotFoundPage";
import { ProductPage } from "../pages/productPage/ProductPage";
import { PlantsPage } from "../pages/plantsPage/PlantsPage";
import { FavouritesPage } from "../pages/favouritesPage/FavouritesPage";
import { CartPage } from "../pages/cartPage/CartPage";
import { CheckOutPage } from "../pages/checkOutPage/CheckOutPage";
import { AboutPage } from "../pages/aboutPage/AboutPage";
import { InspoPage } from "../pages/inspoPage/InspoPage";
import { UserDashboard } from "../pages/account/UserDashboard";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";

const routes = (
  <>
    <Route path="/" element={<HomePage />} />
    <Route path="/plants/:id" element={<ProductPage />} />
    <Route path="/plants/all-plants" element={<PlantsPage />} />
    <Route path="/plants/all-plants/:category" element={<PlantsPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/check-out" element={<CheckOutPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/inspo" element={<InspoPage />} />
    <Route path="/dashboard" element={<UserDashboard />} />
    <Route path="/wishlist" element={<FavouritesPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </>
);

export default routes;
