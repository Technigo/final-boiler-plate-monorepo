// Import the 'Route' component from the 'react-router-dom' library.
import { Route } from "react-router-dom";
// Import various page components used as route elements.
import { Admin } from "../pages/Admin";
import { Register } from "../pages/Register";
import { Tasks } from "../pages/Tasks";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { ContactUs } from "../pages/ContactUs"
import { Home } from "../pages/Home";
import { WhoAreWe } from "../pages/WhoAreWe";
import { SurfLessons } from "../pages/SurfLessons";
import { BookNow } from "../pages/BookNow";

// Define the 'routes' variable as a JSX expression.
const routes = (
  <>

    {/* Define a route for the root path ('/') that renders the 'Login' component. */}
    <Route path="/" element={<Home />} />
    <Route path="/ContactUs" element={<ContactUs />} />
    <Route path="/WhoAreWe" element={<WhoAreWe />} />
    <Route path="/SurfLessons" element={<SurfLessons />} />
    <Route path="/BookNow" element={<BookNow />} />
    {/* for surfschool to log in */}
    <Route path="/Admin" element={<Admin />} />

    {/* routes for maybe use */}
    <Route path="/Login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/tasks" element={<Tasks />} />

    {/* Define a catch-all route that matches any other path ('*') and renders the 'NotFound' component. */}
    <Route path="*" element={<NotFound />} />
  </>
);

// Export the 'routes' variable as the default export of this module.
export default routes;

