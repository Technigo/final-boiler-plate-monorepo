import { Navigate, useLocation } from 'react-router-dom';
import { adminLoginStore } from '../stores/adminLoginStore';

// Function to make sure admin is logged in in order to access the routes
export const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { isLoggedIn, role } = adminLoginStore((state) => ({
        isLoggedIn: state.isLoggedIn,
        role: state.role
    }));

    if (!isLoggedIn || role !== 'admin') {
        // Redirect to login page if not logged in as an admin
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
};
