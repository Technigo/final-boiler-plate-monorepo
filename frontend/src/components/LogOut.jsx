import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button"

export const LogOut = () => {
    const { isLoggedIn, logoutUser } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/");
            console.clear(); // Clears the console after the logout
        } catch (error) {
            console.error("There was an error during logout =>", error);
        }
    }

    return (
        <div className="logOut">
            {isLoggedIn ? (
                <Link to="/logout" onClick={handleLogout}><Button className={"button"} btnText={"Log out"} /></Link>
            ) : (
                null
            )}
        </div>
    )
}