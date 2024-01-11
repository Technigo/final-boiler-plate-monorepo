import { Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";
import { Tasks } from "../pages/Tasks";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { About } from "../pages/About";
import { Profile } from "../pages/Profile";

// Define the 'routes' variable as a JSX expression.
const routes = (
  <>
    {/* Define a route for the root path ('/') that renders the 'Home' component. */}
    <Route path="/" element={<Home />} />

    {/* Define a route for the '/login' path that renders the 'Login' component. */}
    <Route path="/login" element={<Login />} />

    {/* Define a route for the '/home' path that renders the 'Home' component.
    <Route path="/home" element={<Home />} /> */}

    {/* Define a route for the '/tasks' path that renders the 'Tasks' component. */}
    <Route path="/tasks" element={<Tasks />} />

    {/* Define a route for the '/register' path that renders the 'Register' component. */}
    <Route path="/register" element={<Register />} />

    {/* Define a route for the '/about' path that renders the 'About' component. */}
    <Route path="/about" element={<About />} />

    {/* Define a route for the '/profile' path that renders the 'Profile' component. */}
    <Route path="/profile" element={<Profile />} />

    {/* Define a catch-all route that matches any other path ('*') and renders the 'NotFound' component. */}
    <Route path="*" element={<NotFound />} />
  </>
);

// Export the 'routes' variable as the default export of this module.
export default routes;
