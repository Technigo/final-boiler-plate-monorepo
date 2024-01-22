import { Route } from "react-router-dom";
import { Home } from '../pages/Home.jsx'
import { DogSearch } from '../pages/DogSearch.jsx'
import { AboutUs } from '../pages/AboutUs.jsx'
import { LogIn } from "../pages/LogIn.jsx";
import { UserProfile } from "../pages/UserProfile.jsx"

// Define the 'routes' variable as a JSX expression.
const routes = (
  <>
    {/* Define a route for the root path ('/') that renders the 'Home' component. */}
    <Route path="/" element={<Home />} />
    {/* Define a route for the '/dogsearch' path that renders the 'DogSearch' component. */}
    <Route path="/dogsearch" element={<DogSearch />} />
    {/* Define a route for the '/aboutus' path that renders the 'AboutUs' component. */}
    <Route path="/aboutus" element={<AboutUs />} />
    {/* Define a route for the '/login' path that renders the 'LogIn' component. */}
    <Route path="/login" element={<LogIn />} />
    {/* Define a route for the '/userProfile' path that renders the 'UserProfile' component. */}
    <Route path="/userProfile" element={<UserProfile />} />
  </>
);

// Export the 'routes' variable as the default export of this module.
export default routes;

// SUMMARY

// This file sets up routing for a React application using React Router. It imports the necessary components and defines routes for different URL paths, associating each path with a specific component to be rendered when that path is accessed. The catch-all route with the path "*" is used to handle routes that do not match any of the specified paths, rendering the "NotFound" component in such cases.
