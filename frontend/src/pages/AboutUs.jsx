import { Header } from '../components/Header.jsx'
import { NavBar } from '../components/NavBar.jsx'
import { Footer } from '../components/Footer.jsx'
import styles from '../styles/AboutUs.module.css'

export const AboutUs = () => {
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

export default AboutUs