import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes"; // Your regular routes
import AdminRoutes from "./routes/adminRoutes"; // Admin routes component
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";
import "./App.css";

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar /> {/* Navbar at the top of all pages*/}
      <main>
        <Routes>
          {routes} {/* Regular routes */}
          <Route path="/admin/*" element={<AdminRoutes />} /> {/* Admin routes */}
        </Routes>
      </main>
      <Footer /> {/* Footer at the bottom of all pages*/}
    </BrowserRouter>
  );
};



