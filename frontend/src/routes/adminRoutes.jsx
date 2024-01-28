import { Routes, Route } from "react-router-dom";
import { AdminLogin } from "../pages/AdminLogin";
import { AdminDashboard } from "../pages/AdminDashboard";
import { AdminRegister } from "../pages/adminPages/AdminRegister";
import { ListUsers } from "../pages/adminPages/ListUsers";
import { UpgradeUser } from "../pages/adminPages/UpgradeUser";
import { ManageCocktails } from "../pages/adminPages/ManageCocktails";
import { ProtectedRoute } from "./routeProtection" //Make sure admin is logged in to access routes

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<AdminLogin />} /> {/* Admin login page */}
            <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} /> {/* Landingpage with admin options*/}
            < Route path="/register" element={<ProtectedRoute><AdminRegister /></ProtectedRoute>} /> {/* Register new admin */}
            <Route path="/users" element={<ProtectedRoute><ListUsers /></ProtectedRoute>} /> {/* Get list of all registered users */}
            <Route path="/upgrade-user" element={<ProtectedRoute><UpgradeUser /></ProtectedRoute>} /> {/* Upgrade user to admin */}
            <Route path="/manage-cocktails" element={<ProtectedRoute><ManageCocktails /></ProtectedRoute>} /> {/* Page to manage cocktails - add, update and delete cocktails */}
        </Routes>
    );
};

export default AdminRoutes;

