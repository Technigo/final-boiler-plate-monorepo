import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";
import "./css/loginform.css";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const storeHandleLogin = userStore((state) => state.handleLogin);

    const onLoginClick = async () => {
        if (!username || !password) {
            alert("Please enter both username and password");
            return;
        }
        try {
            await storeHandleLogin(username, password);
            const isLoggedIn = userStore.getState().isLoggedIn;
            if (isLoggedIn) {
                navigate("/home");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login");
        }
    };

    return (
        <div className="loginform">
            <h2>MY PAGE</h2>
            <div className="user-login">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={onLoginClick}>Login</button>
            </div>
        </div>
    );
};

export default LoginForm;
