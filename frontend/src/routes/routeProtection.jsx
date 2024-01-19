//Was not able to make this work with role check - role is being passed in postman but not in the fronend. Need to work more on this later.

import { Navigate, useLocation } from 'react-router-dom';
import { adminLoginStore } from '../stores/adminLoginStore';

// Function to make sure admin is logged in in order to access the routes
export const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isLoggedIn = adminLoginStore((state) => state.isLoggedIn);

    console.log("ProtectedRoute, isLoggedIn:", isLoggedIn); // Add this line

    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
};


//Code including role check - use this when role being passed to frontend is fixed
/*
import { Navigate, useLocation } from 'react-router-dom';
import { adminLoginStore } from '../stores/adminLoginStore';

// Function to make sure admin is logged in in order to access the routes
export const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { isLoggedIn, role } = adminLoginStore((state) => ({
        isLoggedIn: state.isLoggedIn,
        role: state.role
    }));

    console.log("isLoggedIn:", isLoggedIn, "role:", role);

    if (!isLoggedIn || role !== 'admin') {
        // Redirect to login page if not logged in as an admin
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
};*/