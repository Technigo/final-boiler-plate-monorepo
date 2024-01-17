import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const API_URL = import.meta.env.VITE_BACKEND_API;
const withEndpoint = (endpoint) => `${API_URL}/api/users/${endpoint}`;

export const Profile = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(withEndpoint("profile"), {}, { withCredentials: true });
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Welcome ${user}`, { position: "top-right" })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <>
      <div>
        <h4>
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
    </>
  );
};
