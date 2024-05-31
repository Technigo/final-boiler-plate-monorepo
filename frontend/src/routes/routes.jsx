// Import the 'Route' component from the 'react-router-dom' library.
import { Route } from "react-router-dom";
// Import various page components used as route elements.
//import { Home } from "../pages/Home";
//import { Register } from "../pages/Register";
//import { Tasks } from "../pages/Tasks";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { WelcomeText } from "../components/WelcomeText";
import { RegistrationForm } from "../components/RegistrationForm";
import { Play } from "../components/Play";
import { Math } from "../components/Games/Math";
import { English } from "../components/Games/English";
import { Swedish } from "../components/Games/Swedish";
import { Progress } from "../components/MyProgress"


// Define the 'routes' variable as a JSX expression.
const routes = (
  <>
    {/* Define a route for the root path ('/') that renders the 'Login' component. */}
    <Route path="/" element={<WelcomeText />} />
    {/* Define a route for the '/home' path that renders the 'Home' component. 
    <Route path="/home" element={<Home />} />*/}
    {/* Define a route for the '/register' path that renders the 'Register' component. */}
    <Route path="/register" element={<RegistrationForm />} />  
    <Route path="/login" element={<Login />} />
    <Route path="/play" element={<Play />} />
    <Route path="/play/math" element={<Math />} />
    <Route path="/play/swedish" element={<Swedish />} />
    <Route path="/play/english" element={<English />} />
    <Route path="/myprogress" element={<Progress />} />
    {/* Define a catch-all route that matches any other path ('*') and renders the 'NotFound' component. */}
    <Route path="*" element={<NotFound />} />
  </>
);

// Export the 'routes' variable as the default export of this module.
export default routes;