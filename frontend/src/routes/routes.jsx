// Import the 'Route' component from the 'react-router-dom' library.
import { Route } from "react-router-dom";
// Import various page components used as route elements.
import { HomeCBC } from "../pages/HomeCBC";
import { Cocktails } from "../pages/Cocktails";


// Define the 'routes' variable as a JSX expression.
const routes = (
    <>

        <Route path="/" element={<HomeCBC />} />
        <Route path="/Cocktails" element={<Cocktails />} />

    </>
);

// Export the 'routes' variable as the default export of this module.
export default routes;