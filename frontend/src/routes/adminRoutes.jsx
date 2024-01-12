import { Routes, Route } from "react-router-dom";
import { AdminLogin } from "../pages/AdminLogin";
import { AdminDashboard } from "../pages/AdminDashboard";
import { AdminRegister } from "../pages/adminPages/AdminRegister";
import { ListUsers } from "../pages/adminPages/ListUsers";
import { UpgradeUser } from "../pages/adminPages/UpgradeUser";
import { ManageCocktails } from "../pages/adminPages/ManageCocktails";
//import { ProtectedRoute } from "./routeProtection"

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<AdminLogin />} /> {/* Admin login page */}
            <Route path="/dashboard" element={<AdminDashboard />} /> {/* Landingpage with admin options*/}
            <Route path="/register" element={<AdminRegister />} /> {/* Register new admin */}
            <Route path="/users" element={<ListUsers />} /> {/* Get list of all registered users */}
            <Route path="/upgrade-user" element={<UpgradeUser />} /> {/* Upgrade user to admin */}
            <Route path="/manage-cocktails" element={<ManageCocktails />} /> {/* Page to manage cocktails - add, update and delete cocktails */}
        </Routes>
    );
};

export default AdminRoutes;

