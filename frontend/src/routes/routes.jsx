import { Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import { NotFound } from "../pages/notfound/NotFound";
import { ProductPage } from "../pages/productPage/ProductPage";
import { PlantsPage } from "../pages/plantsPage/PlantsPage";
import { CartPage } from "../pages/cartPage/CartPage";


const routes = (
    <>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />}/>
    <Route path="*" element={<NotFound />}/>
    <Route path="/plants/:id" element={<ProductPage />}/>
    <Route path="/plants/all-plants" element={<PlantsPage />}/>
    <Route path="/cart" element={<CartPage />}/>
    </>
);

export default routes; 