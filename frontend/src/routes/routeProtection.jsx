/*import { Navigate, useLocation } from 'react-router-dom';
import { adminStore } from '../stores/adminStore';

export const ProtectedRoute = ({ children }) => {
    // Get the current login status from adminStore
    const { isLoggedIn } = adminStore.getState();
    const location = useLocation();

    if (!isLoggedIn) {
        // If not logged in, redirect to the admin login page
        // 'state' is used to remember the location the user tried to access
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    // If logged in, render the requested component (children)
    return children;
};
*/