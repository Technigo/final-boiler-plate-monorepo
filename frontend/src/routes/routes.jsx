import React from "react";
import { Route } from "react-router-dom";
import { FadeWrapper } from "../components/Fade"; // Assuming you have a Fade component implemented

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
    <Route path="/" element={<FadeWrapper><Home /></FadeWrapper>} />
    <Route path="/ContactUs" element={<FadeWrapper><ContactUs /></FadeWrapper>} />
    <Route path="/WhoAreWe" element={<FadeWrapper><WhoAreWe /></FadeWrapper>} />
    <Route path="/SurfLessons" element={<FadeWrapper><SurfLessons /></FadeWrapper>} />
    <Route path="/BookNow" element={<FadeWrapper><BookNow /></FadeWrapper>} />
    <Route path="/Admin" element={<FadeWrapper><Admin /></FadeWrapper>} />
    <Route path="/HandledBooking" element={<FadeWrapper><HandledBooking /></FadeWrapper>} />
    <Route path="/UnHandledBooking" element={<FadeWrapper><UnHandledBooking /></FadeWrapper>} />
    <Route path="/Login" element={<FadeWrapper><Login /></FadeWrapper>} />
    <Route path="/register" element={<FadeWrapper><Register /></FadeWrapper>} />
    <Route path="/booking/:id" element={<FadeWrapper><Tasks /></FadeWrapper>} />
    <Route path="*" element={<FadeWrapper><NotFound /></FadeWrapper>} />
  </>
);

export default routes;
