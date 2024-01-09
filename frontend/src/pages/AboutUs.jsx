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
                    <div className={styles.headerImage}>
                        <h2>ABOUT US</h2>
                    </div>
                    <div className={styles.textWrapper}>
                        <h3>OUR STORY</h3>
                        <p>Here will be a touching story about this imaginary dog organisation.</p>
                        <p>I love dogs!</p>
                        <p>Dogs are the best!</p>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default AboutUs