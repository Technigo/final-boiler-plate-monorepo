import styles from '../styles/Home.module.css'
import { Header } from '../components/Header.jsx'
import { NavBar } from '../components/NavBar.jsx'
import { HeroImage } from '../components/HeroImage.jsx'
import { InfoBlock1 } from '../components/InfoBlock1.jsx'
import { InfoImage } from '../components/InfoImage.jsx'
import { InfoBlock2 } from '../components/InfoBlock2.jsx'
import { Footer } from '../components/Footer.jsx'

export const Home = () => {
    return (
        <>
            <div className={styles.siteContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.headingContainer}>
                        <Header />
                        <NavBar />
                    </div>
                    <HeroImage />
                    <InfoBlock1 />
                    <InfoImage />
                    <InfoBlock2 />
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Home