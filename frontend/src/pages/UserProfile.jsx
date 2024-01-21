import styles from '../styles/UserProfile.module.css'
import { Header } from '../components/Header.jsx'
import { NavBar } from '../components/NavBar.jsx'
import { Footer } from '../components/Footer.jsx'
import AddDogs from '../components/AddDogs.jsx'
import YourDogs from '../components/YourDogs.jsx';

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
                    <div className={styles.contentWrapper}>
                        <div className={styles.textWrapper}>
                            <p>Welcome!</p>
                            <p>This is your user profile. Here you can add the dogs you have currently available in your 
                                shelter to our database, inspect them or delete them if they have been lucky enough to find a home!</p>
                            <p>We ask you kindly to keep your list of dogs updated - please delete the dog from the database
                                in case it is no longer available for adoption.</p>
                            <p>Thank you for choosing to use Rescue Helper and making it easier for someone to offer a forever home
                                to a rescue dog!</p>
                            <p>Please reach out to us with any questions you might have at admin@rescuehelper.com.</p>
                        </div>
                        <AddDogs />
                    </div>
                    <div className={styles.displayDogs}>
                        <YourDogs />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default UserProfile