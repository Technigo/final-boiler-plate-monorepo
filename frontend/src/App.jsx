import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes"; // Your regular routes
import AdminRoutes from "./routes/adminRoutes"; // Admin routes component
import { Navbar } from "./layout/Navbar";
import "./App.css";

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar /> {/* This will place the Navbar at the top */}
      <main>
        <Routes>
          {routes} {/* Regular routes */}
          <Route path="/admin/*" element={<AdminRoutes />} /> {/* Admin routes */}
        </Routes>
      </main>
    </BrowserRouter>
  );
};
