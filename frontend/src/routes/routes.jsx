import { Route } from "react-router-dom";

import { About } from "../pages/About";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { CreateTrip } from "../pages/CreateTrip";
import { Contact } from "../pages/Contact";
import { Trips } from "../components/Trips";
import { Messages } from "../pages/Messages";
import { TripDetails } from "../components/TripDetails";
import { MyTrips } from "../pages/MyTrips";

// Define the 'routes' variable as a JSX expression.
const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/createtrip" element={<CreateTrip />} />
    <Route path="/trips" element={<Trips />} />
    <Route path="/mytrips" element={<MyTrips />} />
    <Route path="/trips/:tripId" element={<TripDetails />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/messages" element={<Messages />} />
    <Route path="*" element={<NotFound />} />
  </>
);

export default routes;

// Export the 'routes' variable as the default export of this module.

// SUMMARY

// This file sets up routing for a React application using React Router. It imports the necessary components and defines routes for different URL paths, associating each path with a specific component to be rendered when that path is accessed. The catch-all route with the path "*" is used to handle routes that do not match any of the specified paths, rendering the "NotFound" component in such cases.
