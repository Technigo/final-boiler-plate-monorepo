import styles from '../styles/NavBar.module.css'
import { Link } from 'react-router-dom'
import { userStore } from "../stores/userStore.jsx";
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
    const { isLoggedIn } = userStore()
    const storeHandleLogout = userStore((state) => state.handleLogout);
    const navigate = useNavigate();

    // Handle the click event of the logout button
    const onLogoutClick = () => {
        storeHandleLogout();
        alert("Woof! See you next time.");
        // Navigate to the homepage if logout was successful
        navigate("/");
    };
    return (
        <>
            <div className={styles.mainContainer}>
                {isLoggedIn ? (
                    <div className={styles.navContainer}>
                        <Link to="/dogsearch" className={styles.navLink}><p>DOG SEARCH</p></Link>
                        <Link to="/userProfile" className={styles.navLink}><p>YOUR PROFILE</p></Link>
                        <p onClick={onLogoutClick}>LOG OUT</p>
                    </div>
                ) : (
                    <div className={styles.navContainer}>
                        <Link to="/dogsearch" className={styles.navLink}><p>DOG SEARCH</p></Link>
                        <Link to="/aboutus" className={styles.navLink}><p>ABOUT US</p></Link>
                        <Link to="/login" className={styles.navLink}><p>LOG IN</p></Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default NavBar