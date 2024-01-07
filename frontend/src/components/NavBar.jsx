import styles from '../styles/NavBar.module.css'
import { Link } from 'react-router-dom'

export const NavBar = () => {
    return (
        <>
        <div className={styles.mainContainer}>
            <Link to="/dogsearch" className={styles.navLink}><p>DOG SEARCH</p></Link>
            <Link to="/aboutus" className={styles.navLink}><p>ABOUT US</p></Link>
            <Link to="/login" className={styles.navLink}><p>LOG IN</p></Link>
        </div>
        </>
    )
}

export default NavBar