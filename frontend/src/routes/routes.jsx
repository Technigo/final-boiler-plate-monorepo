// Import the 'Route' component from the 'react-router-dom' library.
import { Route } from "react-router-dom";
// Import various page components used as route elements.
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";
import { Login } from "../pages/Login/Login";
// import { ErrorPage } from "../pages/Errorpage/ErrorPage";
import  PlaygroundDetails  from "../pages/Playgrounddetails/PlaygroundDetails";
import { MyFavorites } from "../pages/MyFavorites/MyFavorites";

// Define the 'routes' variable as a JSX expression.
const routes = (
  <>
    {/* Define a route for the root path ('/') that renders the 'Login' component. */}
    <Route path="/" element={<Home />} />
    {/* Define a route for the ('/playground') path that renders the 'Playground' component. */}
    <Route path="/playground/:id" element={<PlaygroundDetails />} />
    {/* Define a route for the '/home' path that renders the 'Home' component. */}
    <Route path="/login" element={<Login />} />
    {/* Define a route for the '/secretpage' path that renders the 'SecretPage' component, aka the user's favorited playgrounds. */}
    <Route path="/secretpage" element={<MyFavorites />} />
    {/* Define a route for the '/register' path that renders the 'Register' component. */}
    <Route path="/register" element={<Register />} />
    {/* Define a catch-all route that matches any other path ('*') and renders the 'NotFound' component. */}
    {/* <Route path="*" element={<ErrorPage />} /> */}
  </>
);

// Export the 'routes' variable as the default export of this module.
export default routes;

// SUMMARY

// This file sets up routing for a React application using React Router. It imports the necessary components and defines routes for different URL paths, associating each path with a specific component to be rendered when that path is accessed. The catch-all route with the path "*" is used to handle routes that do not match any of the specified paths, rendering the "NotFound" component in such cases.
