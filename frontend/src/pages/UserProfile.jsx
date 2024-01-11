import styles from '../styles/UserProfile.module.css'
import { Header } from '../components/Header.jsx'
import { NavBar } from '../components/NavBar.jsx'
import { Footer } from '../components/Footer.jsx'

export const UserProfile = () => {
    return (
        <>
            <div className={styles.siteContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.headingContainer}>
                        <Header />
                        <NavBar />
                    </div>
                    <div className={styles.headerImage}>
                        <h2>YOUR PROFILE</h2>
                    </div>
                    <div className={styles.logInWrapper}>
                        <div className={styles.textWrapper}>
                        <p>Welcome back, username!</p>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default UserProfile