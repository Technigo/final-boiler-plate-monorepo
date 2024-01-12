import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button"
import { useTranslation } from "react-i18next";

export const LogOut = () => {
    const { t } = useTranslation();
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
                <Link to="/logout" onClick={handleLogout}><Button className={"logout-button"} btnText={t("Logout.logout")} /></Link>
            ) : (
                null
            )}
        </div>
    )
}