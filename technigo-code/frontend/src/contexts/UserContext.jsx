import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState({
    accessToken: localStorage.getItem("accessToken") || null,
    auth: !!localStorage.getItem("accessToken"),
  });
  const navigate = useNavigate();

  const login = async (loginData) => {
    try {
      const response = await fetch(
        "https://technigo-final-project-pluggin.onrender.com/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (!response.ok) {
        console.log("Login failed");
        throw new Error("Failed to get user");
      }

      const data = await response.json();
      console.log("Login success", data);

      localStorage.setItem("accessToken", data.accessToken);
      setAuthenticated({
        accessToken: data.accessToken,
        auth: true,
      });
    } catch (err) {
      console.error("No user was found:", err);
    }
  };

  const signout = () => {
    localStorage.removeItem("accessToken");
    setAuthenticated({
      accessToken: null,
      auth: false,
    });
    navigate("/login");
  };

  const registerUser = async (userData) => {
    try {
      const response = await fetch(
        "https://technigo-final-project-pluggin.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.json();
      console.log("Registration success", data);

      localStorage.setItem("accessToken", data.accessToken);
      setAuthenticated({
        accessToken: data.accessToken,
        auth: true,
      });
    } catch (err) {
      console.error("Error registering new user:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        authenticated,
        setAuthenticated,
        login,
        signout,
        registerUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
