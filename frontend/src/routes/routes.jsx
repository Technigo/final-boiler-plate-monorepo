import { Route } from "react-router-dom";

//import pages
import { Admin } from "../pages/Admin";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { ContactUs } from "../pages/ContactUs";
import { Home } from "../pages/Home";
import { WhoAreWe } from "../pages/WhoAreWe";
import { SurfLessons } from "../pages/SurfLessons";
import { BookNow } from "../pages/BookNow";
import { HandledBooking } from "../pages/HandleBooking";
import { UnHandledBooking } from "../pages/UnHandledBooking";
import { Newsletter } from "../pages/Newsletter";

const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/ContactUs" element={<ContactUs />} />
    <Route path="/WhoAreWe" element={<WhoAreWe />} />
    <Route path="/SurfLessons" element={<SurfLessons />} />
    <Route path="/BookNow" element={<BookNow />} />
    <Route path="/Admin" element={<Admin />} />
    <Route path="/HandledBooking" element={<HandledBooking />} />
    <Route path="/UnHandledBooking" element={<UnHandledBooking />} />
    <Route path="/Newsletter" element={<Newsletter />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Register" element={<Register />} />
    <Route path="*" element={<NotFound />} />
  </>
);

export default routes;
