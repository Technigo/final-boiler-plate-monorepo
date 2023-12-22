// Import the 'Route' component from the 'react-router-dom' library.
import { Route } from "react-router-dom";
// Import various page components used as route elements.
import { Home } from "../pages/home/Home";
import { Register } from "../pages/register/Register";
// import { Tasks } from "../pages/Tasks";
import { Login } from "../pages/login/Login";
import { NotFound } from "../pages/notfound/NotFound";
import { ProductPage } from "../pages/productPage/ProductPage";
import { CategoriesPage } from "../pages/categoriesPage/CategoriesPage";
import { CartPage } from "../pages/cartpage/CartPage";

// Define the 'routes' variable as a JSX expression.
const routes = (
  <>
    {/* Define a route for the root path ('/') that renders the 'Login' component. */}
    <Route path="/" element={<Home />} />
    {/* Define a route for the '/home' path that renders the 'Home' component. */}
    <Route path="/login" element={<Login />} />
    {/* Define a route for the '/tasks' path that renders the 'Tasks' component. */}
    {/* <Route path="/tasks" element={<Tasks />} /> */}
    {/* Define a route for the '/register' path that renders the 'Register' component. */}
    <Route path="/register" element={<Register />} />
    {/* Define a catch-all route that matches any other path ('*') and renders the 'NotFound' component. */}
    <Route path="*" element={<NotFound />} />
    <Route path="/plants/:id" element={<ProductPage />} />
    <Route path="/plants/categories" element={<CategoriesPage />} />
    <Route path="/cart" element={<CartPage />} />
  </>
);

// Export the 'routes' variable as the default export of this module.
export default routes;

// SUMMARY

// This file sets up routing for a React application using React Router. It imports the necessary components and defines routes for different URL paths, associating each path with a specific component to be rendered when that path is accessed. The catch-all route with the path "*" is used to handle routes that do not match any of the specified paths, rendering the "NotFound" component in such cases.
