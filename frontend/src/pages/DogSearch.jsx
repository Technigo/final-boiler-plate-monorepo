import styles from '../styles/DogSearch.module.css'
import { Header } from '../components/Header.jsx'
import { NavBar } from '../components/NavBar.jsx'
import { Footer } from '../components/Footer.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const DogSearch = () => {
    const [dogs, setDogs] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/findDogs')
            .then(dogs => setDogs(dogs.data))
            .catch(err => console.log(err))
    }, [])

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
                        {dogs.map(dog => (
                            <div className={styles.dogs}>
                                <p>Name: {dog.name}</p>
                                <p>Puppy: {dog.puppy}</p>
                                <p>Special adoption {dog.special_adoption}</p>
                                <p>Size: {dog.size}</p>
                            </div>
                        ))}
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default DogSearch