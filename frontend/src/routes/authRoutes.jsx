import { Route } from "react-router-dom";

const authRoutes = (
  <>
    {/* <Route path="/" element={<Home />} /> */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </>
);

export default authRoutes;