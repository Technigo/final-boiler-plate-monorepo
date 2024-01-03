import styles from '../styles/Home.module.css'
import { Header } from './Header.jsx'
import { HeroImage } from './HeroImage.jsx'
import { InfoBlock1 } from './InfoBlock1.jsx'
import { InfoImage } from './InfoImage.jsx'
import { InfoBlock2 } from './InfoBlock2.jsx'
import { Footer } from './Footer.jsx'

export const Home = () => {
    return (
        <>
            <div className={styles.siteContainer}>
                <div className={styles.mainContainer}>
                    <Header />
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