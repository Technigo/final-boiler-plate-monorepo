import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/userStore";
/*import "./loginform.css";*/

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const storeHandleLogin = userStore((state) => state.handleLogin);
    const isLoggedIn = userStore((state) => state.isLoggedIn);

    const onLoginClick = async () => {
        if (!username || !password) {
            alert("Please enter both username and password");
            return;
        }
        try {
            await storeHandleLogin(username, password);
            const isLoggedIn = userStore.getState().isLoggedIn;
            if (isLoggedIn) {
                navigate("/habits");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login");
        }
    };

    const { t } = useTranslation();

    if (isLoggedIn) {
        return null;
    } else {
        return (<div className="loginform">
            <h2>{t("My page")}</h2>
            <div className="user-login">
                <input
                    type="text"
                    placeholder={t("Username")}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder={t("Password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login" onClick={onLoginClick}>{t("Login")}</button>
            </div>
        </div>);
    }
};

export default LoginForm;
