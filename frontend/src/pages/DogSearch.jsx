import styles from '../styles/DogSearch.module.css'
import { Header } from '../components/Header.jsx'
import { NavBar } from '../components/NavBar.jsx'
import { Footer } from '../components/Footer.jsx'

export const DogSearch = () => {
    return (
        <>
            <div className={styles.siteContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.headingContainer}>
                        <Header />
                        <NavBar />
                    </div>
                    <div className="searchbar">
                        <h1>Find your new furry friend here</h1>

                        <button>small</button>
                        <button>medium</button>
                        <button>big</button>

                        <button>Find dog</button>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default DogSearch