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
                    <div className={styles.searchImage}>
                        <h2>DOG SEARCH</h2>
                    </div>
                    <div className={styles.searchForm}>
                        <form>
                            <div className={styles.formRow}>
                                <div className={styles.formPiece}>
                                    <label for="name">Organisation</label>
                                    <select name="organisation" id="organisation">
                                        <option value="happypaws">Happy Paws</option>
                                        <option value="dogrescue">Dog Rescue Foundation</option>
                                        <option value="marys">Mary's Dog Shelter</option>
                                    </select>
                                </div>
                                <div className={styles.formPiece}>
                                    <label for="size">Size</label>
                                    <select name="size" id="size">
                                        <option value="small">Small</option>
                                        <option value="midsize">Mid-size</option>
                                        <option value="big">Big</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formPiece}>
                                    <label for="age">Estimated age</label>
                                    <select name="age" id="age">
                                        <option value="0-1">0-1</option>
                                        <option value="2-5">2-5</option>
                                        <option value="6-10">6-10</option>
                                        <option value="10">10+</option>
                                    </select>
                                </div>
                                <div className={styles.formPiece}>
                                    <input type="checkbox" id="special" name="special" value="special" />
                                    <label for="special"> Show dogs classified as "special adoption"</label>
                                </div>
                            </div>
                        </form>
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