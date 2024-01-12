import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import "../../pages/form.css";
import { useTranslation } from "react-i18next";

export const Register = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { registerUser, username, setUsername, password, setPassword, email, setEmail } = useUserStore();

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await registerUser(username, password, email);
            if (username && password && email) {
                navigate("/login");
                return;
            }
        } catch (error) {
            console.error("There was an error during signup =>", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            
            <div className="form-container">

                <form className="form">
                    <h1 className="form-header">{t("Form.headerRegister")}</h1>
                <div className="form-group">
                    <label htmlFor="email"></label>
                    <input
                        className="input-field"
                        type="email"
                        id="email"
                        placeholder={t("Form.email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>


                <div className="form-group">
                    <label htmlFor="username"></label>
                    <input
                        className="input-field"
                        type="text"
                        id="username"
                        placeholder={t("Form.username")}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="password"></label>
                    <input
                        className="input-field"
                        type="password"
                        id="password"
                        placeholder={t("Form.password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>

                <div> 
                {loading ? (
                <Loader />
                ) : ( 
                <Button 
                className={"form-button"} 
                handleOnClick={handleRegister} 
                btnText={t("Form.register")} 
                />
                )}
                </div>
                <div>
                    <h2 className="form-header">{t("Form.notnew")}</h2>
                    <Link to="/login">
                        <Button 
                        className={"form-button"} 
                        btnText={t("Form.login")} />
                    </Link>
                </div>
             </form>
              
            </div>
        </>
    )
}
