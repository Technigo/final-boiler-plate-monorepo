import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import "./form.css";

export const Register = () => {
    const navigate = useNavigate();

    // Destructures the function loginUser from the useUserStore hook
    const { registerUser, username, setUsername, password, setPassword, email, setEmail } = useUserStore();

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            await registerUser(username, password, email);
            if (username && password && email) {
                navigate("/login");
                return;
            }
        } catch (error) {
            console.error("There was an error during signup =>", error);
        }
    }

    return (
        <>
            
            <div className="form-container">

                <form className="form">
                    <h1>Register</h1>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        className="input-field"
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>


                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        className="input-field"
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        className="input-field"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>

                <div className="loginAndRegisterBtns">
                    <Button className={"button"} handleOnClick={handleRegister} btnText={"Register"} />
                    <Link to="/"><Button className={"button"} btnText={"Start over"} /></Link>
                </div>
             </form>
            </div>
        </>
    )
}