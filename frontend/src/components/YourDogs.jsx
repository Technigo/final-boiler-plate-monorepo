import { dogStore } from "../stores/dogStore.jsx";
import { useEffect } from "react";
import { useStore } from "zustand";
import { userStore } from "../stores/userStore.jsx";
import styles from "../styles/UserProfile.module.css"

export const YourDogs = () => {

    const { dogs, fetchDogs } = useStore(dogStore);
    const { user } = userStore()

    useEffect(() => {
        // Fetch dogs when the component mounts
        fetchDogs();
    }, []);

    return (
        <>
            <div className={styles.mainContainer}>
                <h3>YOUR DOGS</h3>
                <div className={styles.dogs}>
                    {dogs.length === 0 ? (
                        <div className={styles.notFound}>
                            <p>You have no dogs in the database.</p>
                        </div>) : (
                        dogs.map((dog) => (
                            <div className={styles.dogCard} key={dog._id}>
                                <div className={styles.dogImage}>
                                    {/* You can add an image here if available */}
                                </div>
                                <div className={styles.dogInfo}>
                                    <p>Name: {dog.name}</p>
                                    <p>Estimated age: {dog.age}</p>
                                    <p>Special adoption: {dog.special_adoption ? "Yes" : "No"}</p>
                                    <p>Size: {dog.size}</p>
                                    <p>Organisation: {dog.organisation}{/* {dog.organisation} */}</p>
                                </div>
                            </div>
                        )))}
                </div>
            </div>
        </>
    )
}

export default YourDogs