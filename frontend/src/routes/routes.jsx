import { Route } from "react-router-dom";
import { HomeCBC } from "../pages/HomeCBC";
import { Cocktails } from "../pages/Cocktails";
import { AboutUs } from "../pages/AboutUs";
import { ContactUs } from "../pages/ContactUs";
import { SinCocktail } from "../pages/SinCocktail";

const routes = (
    <>
        <Route path="/" element={<HomeCBC />} />
        <Route path="/cocktails" element={<Cocktails />} />
        <Route path="/cocktail/:id" element={<SinCocktail />} /> {/* Updated path */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
    </>
);

export default routes;

