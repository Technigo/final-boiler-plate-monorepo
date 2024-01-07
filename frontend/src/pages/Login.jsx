import styles from '../styles/LogIn.module.css'
import { Header } from '../components/Header.jsx'
import { NavBar } from '../components/NavBar.jsx'
import { Footer } from '../components/Footer.jsx'

export const LogIn = () => {
    return (
        <>
            <div className={styles.siteContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.headingContainer}>
                        <Header />
                        <NavBar />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default LogIn