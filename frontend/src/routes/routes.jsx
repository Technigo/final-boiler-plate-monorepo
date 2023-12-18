// Import the 'Route' component from the 'react-router-dom' library.
import { Route } from "react-router-dom";
// Import various page components used as route elements.

import { About } from "../pages/About";
import { Account } from "../pages/Account";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { PostTrip } from "../pages/PostTrip";
import { Register } from "../pages/Register";

// Define the 'routes' variable as a JSX expression.
const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/account" element={<Account />} />
    <Route path="/login" element={<Login />} />
    <Route path="/posttrip" element={<PostTrip />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<NotFound />} />
  </>
);

// Export the 'routes' variable as the default export of this module.
export default routes;

// SUMMARY

// This file sets up routing for a React application using React Router. It imports the necessary components and defines routes for different URL paths, associating each path with a specific component to be rendered when that path is accessed. The catch-all route with the path "*" is used to handle routes that do not match any of the specified paths, rendering the "NotFound" component in such cases.
