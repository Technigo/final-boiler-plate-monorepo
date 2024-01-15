// Accessible only by direct URL: /admin/login

//import { Link } from "react-router-dom"; // Import the 'Link' component from 'react-router-dom'.
import { adminLoginStore } from "../stores/adminLoginStore"; // Import the adminStore from zustand
import { useState } from "react"; // Import useState hook
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
//import styles from './AdminLogin.module.css'; // Styling

export const AdminLogin = () => {
    // State variables for admin username and password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Retrieve handleAdminLogin function from adminStore
    const storeHandleAdminLogin = adminLoginStore((state) => state.handleAdminLogin);

    // Function to handle the click event of the admin login button
    const onAdminLoginClick = async () => {
        if (!username || !password) {
            alert("Please enter both username and password");
            return;
        }
        // Call handleAdminLogin from the adminStore
        await storeHandleAdminLogin(username, password);

        // Retrieve the current state from the adminStore
        const adminState = adminLoginStore.getState();

        // Log the accessToken to the console
        console.log("AccessToken:", adminState.accessToken);

        // Check if admin is logged in and navigate to the dashboard
        const isLoggedIn = adminLoginStore.getState().isLoggedIn;
        if (isLoggedIn) {
            navigate("/admin/dashboard"); // Redirect to admin dashboard upon successful login
        } else {
            alert("Login failed. Please check your credentials.");
        }
    };

    // Render the admin login form
    return (
        <>
            <nav>
                {/* Optional navigation links can be added here */}
            </nav>
            <div>
                <h2>Admin Login</h2>
                <div className="admin-login">
                    <input
                        type="text"
                        placeholder="Admin Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={onAdminLoginClick}>Admin Login</button>
                    <button onClick={() => navigate('/')}>CBC Home</button>
                </div>
            </div>
        </>
    );
};

// SUMMARY

// This code defines the adminLogin component, which handles user login functionality. It imports necessary components, hooks, and the user store, and it defines state variables for username and password. The component also provides a form for entering login credentials, handles the login button click event, and uses React Router to navigate between login and sign-up routes. 


