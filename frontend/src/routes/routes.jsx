import { Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import { NotFound } from "../pages/notfound/NotFound";
import { ProductPage } from "../pages/productPage/ProductPage";
import { PlantsPage } from "../pages/plantsPage/PlantsPage";
import { FilteredShadyPage } from "../pages/plantsPage/FilteredShadyPage";
import { FilteredEasyPage } from "../pages/plantsPage/FilteredEasyPage";
import { FilteredPetsPage } from "../pages/plantsPage/FilteredPetsPage";
import { FilteredPopularPage } from "../pages/plantsPage/FilteredPopularPage";
import { FilteredClimbingPage } from "../pages/plantsPage/FilteredClimbingPage";

import { CartPage } from "../pages/cartPage/CartPage";
import { CheckOut } from "../pages/checkOut/CheckOut";


const routes = (
    <>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />}/>
    <Route path="*" element={<NotFound />}/>
    <Route path="/plants/:id" element={<ProductPage />}/>
    <Route path="/plants/all-plants" element={<PlantsPage />}/>
    <Route path="/plants/all-plants/shady" element={<FilteredShadyPage />}/>
    <Route path="/plants/all-plants/easy" element={<FilteredEasyPage />}/>
    <Route path="/plants/all-plants/pets" element={<FilteredPetsPage />}/>
    <Route path="/plants/all-plants/popular" element={<FilteredPopularPage />}/>
    <Route path="/plants/all-plants/climbing" element={<FilteredClimbingPage />}/>

    <Route path="/cart" element={<CartPage />}/>
    <Route path="/check-out" element={<CheckOut />}/>
    </>
);

export default routes; 