// DOUBLE-CHECK AND UPDATE

// Import the "Route" component from the "react-router-dom" library.
import { Route } from "react-router-dom";
// Import various page components used as route elements.
import { Home } from "../pages/Home";
import { Landing } from "../pages/Landing";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { ProfileSettings } from "../pages/ProfileSettings";
import { UpdateSettings } from "../pages/UpdateSettings";
import { NotFound } from "../pages/NotFound";
import { CreateAd } from "../pages/CreateAd";
import { Search } from "../pages/Search";
import AdDetails from "../pages/AdDetails";
import { About } from "../pages/About";
import { Policy } from "../pages/Policy";
import { EditAd } from "../pages/EditAd";
import { ManageYourAds } from "../pages/ManageYourAds";


// Define the "routes" variable as a JSX expression.
const routes = (
  <>
    {/* Define a route for the root path ("/") that renders the "Landing" page */}
    <Route path="/" element={<Landing />} />
    {/* Define a route for the path ("/login") that renders the "Login" page */}
    <Route path="/login" element={<Login />} />
    {/* Define a route for the "/register" path that renders the "Register" page */}
    <Route path="/register" element={<Register />} />
    {/* Define a route for the "/home" path that renders the "Home" page */}
    <Route path="/home" element={<Home />} />
    {/* Define a route for the "/profile" path that renders the "Profile" page */}
    <Route path="/profile/:userId" element={<Profile />} />    
    {/* Define a route for the "/settings" path that renders the "Profile Settings" component. */}
    <Route path="/settings" element={<ProfileSettings />} /> 
    {/* Define a route for the "/update-settings" path that renders the "Update Settings" component. */}
    <Route path="/update-settings" element={<UpdateSettings />} /> 
    {/* Define a route for the "/about" path and renders the "About" page */}
    <Route path="/about" element={<About />} />
    {/* Define a route for the "/policy" path and renders the "Policy" page */}
    <Route path="/policy" element={<Policy />} />
    {/* Define a route for the '/ads/:id' path that renders the 'AdDe' component. */}
    <Route path="/ads/:id" element={<AdDetails />} />
    {/* Define a route for the "/create-ad" path that renders the "Create Ad" page */}
    <Route path="/create-ad" element={<CreateAd />} />
    {/* Define a route for the "/update-ad" path that renders the "Update Ad" page */}
    <Route path="/edit-ad/:id" element={<EditAd />} />
    {/* Define a route for the "/manage-your-ads" path that renders the "Manage Ads" page */}
    <Route path="/manage-your-ads" element={<ManageYourAds />} />
    {/* Define a route for the "/search" path and renders the "Search" page */}
    <Route path="/search" element={<Search />} />
    
    {/* Define a catch-all route that matches any other path ("*") and renders the "NotFound" component. */}
    <Route path="*" element={<NotFound />} />
  </>
);

// Export the "routes" variable as the default export of this module.
export default routes;

// SUMMARY

// This file sets up routing for a React application using React Router. It imports the necessary components and defines routes for different URL paths, associating each path with a specific component to be rendered when that path is accessed. The catch-all route with the path "*" is used to handle routes that do not match any of the specified paths, rendering the "NotFound" component in such cases.
