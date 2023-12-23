import React from "react";
import { Route } from "react-router-dom";
import { Fade } from "../components/Fade"; // Assuming you have a Fade component implemented

import { Admin } from "../pages/Admin";
import { Register } from "../pages/Register";
import { Tasks } from "../pages/Tasks";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { ContactUs } from "../pages/ContactUs";
import { Home } from "../pages/Home";
import { WhoAreWe } from "../pages/WhoAreWe";
import { SurfLessons } from "../pages/SurfLessons";
import { BookNow } from "../pages/BookNow";
import { HandledBooking } from "../pages/HandleBooking";
import { UnHandledBooking } from "../pages/UnHandledBooking";

const routes = (
  <>
    <Route path="/" element={<Fade><Home /></Fade>} />
    <Route path="/ContactUs" element={<Fade><ContactUs /></Fade>} />
    <Route path="/WhoAreWe" element={<Fade><WhoAreWe /></Fade>} />
    <Route path="/SurfLessons" element={<Fade><SurfLessons /></Fade>} />
    <Route path="/BookNow" element={<Fade><BookNow /></Fade>} />
    <Route path="/Admin" element={<Fade><Admin /></Fade>} />
    <Route path="/HandledBooking" element={<Fade><HandledBooking /></Fade>} />
    <Route path="/UnHandledBooking" element={<Fade><UnHandledBooking /></Fade>} />
    <Route path="/Login" element={<Fade><Login /></Fade>} />
    <Route path="/register" element={<Fade><Register /></Fade>} />
    <Route path="/booking/:id" element={<Fade><Tasks /></Fade>} />
    <Route path="*" element={<Fade><NotFound /></Fade>} />
  </>
);

export default routes;
