import styles from '../styles/LogIn.module.css'
import { Header } from '../components/Header.jsx'
import { NavBar } from '../components/NavBar.jsx'
import { Footer } from '../components/Footer.jsx'
import { userStore } from '../stores/userStore.jsx'
import { useNavigate } from 'react-router-dom';

export const LogIn = () => {
    const { handleLogin } = userStore();
    const navigate = useNavigate();

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            await handleLogin(username, password);
            navigate('/userProfile');
        } catch (error) {
            console.error('Login error:', error);
        }

    };

    return (
        <>
            <div className={styles.siteContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.headingContainer}>
                        <Header />
                        <NavBar />
                    </div>
                    <div className={styles.headerImage}>
                        <h2>LOG IN</h2>
                    </div>
                    <div className={styles.logInWrapper}>
                        <div className={styles.textWrapper}>
                            <p>This is the log in page for dog adoption organisations.</p>
                            <p>Are you representing an organisation? E-mail us at admin@rescuehelper.com to get verified.</p>
                        </div>
                        <div className={styles.formWrapper}>
                            <form onSubmit={handleLoginFormSubmit}>
                                <div className={styles.inputWrapper}>
                                    <label htmlFor="username">Username</label>
                                    <input
                                        name="username"
                                        id="username"
                                        type="text"/>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        name="password"
                                        id="password"
                                        type="password"/>
                                </div>
                                <div className={styles.logIn}>
                                    <button type="submit">Log in</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default LogIn