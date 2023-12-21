// DOUBLE-CHECK AND UPDATE

// Import the 'Route' component from the 'react-router-dom' library.
import { Route } from "react-router-dom";
// Import various page components used as route elements.
import { Home } from "../pages/Home";
import { Landing } from "../pages/Landing";
import { Register } from "../pages/Register";
//import { Ads } from "../pages/Ads";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { ProfileSettings } from "../pages/ProfileSettings";
import { NotFound } from "../pages/NotFound";
import { CreateAd } from "../components/CreateAd";
import { Search } from "../pages/Search";

// Define the 'routes' variable as a JSX expression.
const routes = (
  <>
    {/* Define a route for the root path ('/') that renders the 'Landing' component. */}
    <Route path="/" element={<Landing />} />
    {/* Define a route for the path ('/login') that renders the 'Login' component. */}
    <Route path="/login" element={<Login />} />
    {/* Define a route for the '/home' path that renders the 'Home' component. */}
    <Route path="/home" element={<Home />} />
    {/* Define a route for the '/ads' path that renders the 'Ads' component. */}
    {/* <Route path="/ads" element={<Ads />} /> */}
    {/* Define a route for the '/register' path that renders the 'Register' component. */}
    <Route path="/register" element={<Register />} />
    {/* Define a route for the '/profile' path that renders the 'Profile' component. */}
    <Route path="/profile" element={<Profile />} />    
    {/* Define a route for the '/settings' path that renders the 'Profile Settings' component. */}
    <Route path="/settings" element={<ProfileSettings />} /> 
    {/* Define a route for the '/create-ad' path that renders the 'Create Ad' component. */}
    <Route path="/create-ad" element={<CreateAd />} />
    {/* Define a catch-all route that matches any other path ('*') and renders the 'NotFound' component. */}
    <Route path="/search" element={<Search />} />
    {/* Define a catch-all route that matches any other path ('*') and renders the 'NotFound' component. */}
    <Route path="*" element={<NotFound />} />
  </>
);

// Export the 'routes' variable as the default export of this module.
export default routes;

// SUMMARY

// This file sets up routing for a React application using React Router. It imports the necessary components and defines routes for different URL paths, associating each path with a specific component to be rendered when that path is accessed. The catch-all route with the path "*" is used to handle routes that do not match any of the specified paths, rendering the "NotFound" component in such cases.
