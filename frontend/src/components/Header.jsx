import styles from '../styles/Header.module.css'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.textContainer}>
                    <Link to="/" className={styles.navLink}><h1>RESCUE HELPER</h1></Link>
                </div>
            </div>
        </>
    )
}

export default Header