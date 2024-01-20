import styles from '../styles/UserProfile.module.css'
import { Header } from '../components/Header.jsx'
import { NavBar } from '../components/NavBar.jsx'
import { Footer } from '../components/Footer.jsx'
import { userStore } from "../stores/userStore.jsx";
import { useNavigate } from 'react-router-dom';
import AddDogs from '../components/AddDogs.jsx'

export const UserProfile = () => {
    const storeHandleLogout = userStore((state) => state.handleLogout);
    const navigate = useNavigate();

    // Handle the click event of the logout button
    const onLogoutClick = () => {
        storeHandleLogout();
        alert("Log out succesfull");
        // Navigate to the homepage if logout was successful
        navigate("/");
    };

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
                        <button onClick={onLogoutClick}>Log Out</button>
                        <AddDogs />
                    </div>
                    {/* <div className={styles.dogs}>
                        <div className={styles.dogCard} key={dog._id}>
                            <div className={styles.dogImage}>
                                <img src={dog.image.data} alt={dog.name} />
                            </div>
                            <div className={styles.dogInfo}>
                                <p>Name: {dog.name}</p>
                                <p>Estimated age: {dog.age}</p>
                                <p>Special adoption: {dog.special_adoption ? "Yes" : "No"}</p>
                                <p>Size: {dog.size}</p>
                                <p>Organisation: {dog.organisation}</p>
                            </div>
                        </div>
                    </div> */}
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default UserProfile