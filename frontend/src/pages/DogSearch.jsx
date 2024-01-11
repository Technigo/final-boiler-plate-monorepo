import styles from '../styles/DogSearch.module.css'
import { Header } from '../components/Header.jsx'
import { NavBar } from '../components/NavBar.jsx'
import { Footer } from '../components/Footer.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const DogSearch = () => {
    const [dogs, setDogs] = useState([])
    const [organisation, setOrganisation] = useState('');
    const [size, setSize] = useState('');
    const [age, setAge] = useState('');
    const [specialAdoption, setSpecialAdoption] = useState(false);
    const [search, setSearch] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/findDogs')
          .then((response) => setDogs(response.data))
          .catch((err) => console.log(err));
      }, []);
    
      const handleSearch = (e) => {
        e.preventDefault();
        setSearch(true);
    
        // Filter dogs based on user inputs
        let showDogs = dogs;
    
        if (organisation !== 'any') {
          showDogs = showDogs.filter((dog) => dog.organisation === organisation);
        }
    
        if (size !== 'any') {
          showDogs = showDogs.filter((dog) => dog.size === size);
        }
    
        if (age !== 'any') {
          showDogs = showDogs.filter((dog) => {
            const [min, max] = age.split('-').map(Number);
            return dog.age >= min && dog.age <= max;
          });
        }
    
        if (specialAdoption) {
          showDogs = showDogs.filter((dog) => dog.special_adoption);
        }
    
        setDogs(showDogs);
      };

    /* useEffect(() => {
        axios.get('http://localhost:3000/findDogs')
            .then((response) => {
                let showDogs = response.data;

                // Apply filters based on user inputs
                if (organisation) {
                    showDogs = showDogs.filter((dog) => dog.organisation === organisation);
                }

                if (size) {
                    showDogs = showDogs.filter((dog) => dog.size === size);
                }

                if (age) {
                    showDogs = showDogs.filter((dog) => {
                        const [min, max] = age.split('-').map(Number);
                        return dog.age >= min && dog.age <= max;
                    });
                }

                if (specialAdoption) {
                    showDogs = showDogs.filter((dog) => dog.special_adoption);
                }

                setDogs(showDogs);
            })
            .catch((err) => console.log(err));
    }, [organisation, size, age, specialAdoption]); */

    return (
        <>
            <div className={styles.siteContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.headingContainer}>
                        <Header />
                        <NavBar />
                    </div>
                    <div className={styles.headerImage}>
                        <h2>DOG SEARCH</h2>
                    </div>
                    <div className={styles.searchForm}>
                        <p>Here you can search for all the dogs in our database according to what kind of furry friend you're looking for.</p>
                        <p>There are currently dogs from 6 different animal rescue organisations available for adoption.</p>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setSearch(true);
                          }}>
                            <div className={styles.formRow}>
                                <div className={styles.formPiece}>
                                    <label htmlFor="name">Organisation</label>
                                    <select
                                        name="organisation"
                                        id="organisation"
                                        onChange={(e) => setOrganisation(e.target.value)}>
                                        <option value="any">Any organisation</option>
                                        <option value="happypaws">Happy Paws</option>
                                        <option value="dogrescue">Dog Rescue Foundation</option>
                                        <option value="marys">Mary's Dog Shelter</option>
                                        <option value="woofwoof">Woof Woof Foundation</option>
                                        <option value="streetsafety">From Street to Safety Trust</option>
                                        <option value="furryfriends">The Furry Friends Shelter</option>
                                    </select>
                                </div>
                                <div className={styles.formPiece}>
                                    <label htmlFor="size">Size</label>
                                    <select
                                        name="size"
                                        id="size"
                                        onChange={(e) => setSize(e.target.value)}>
                                        <option value="any">Any size</option>
                                        <option value="small">Small</option>
                                        <option value="medium">Mid-size</option>
                                        <option value="big">Big</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formPiece}>
                                    <label htmlFor="age">Estimated age</label>
                                    <select
                                        name="age"
                                        id="age"
                                        onChange={(e) => setAge(e.target.value)}>
                                        <option value="any">Any age</option>
                                        <option value="0-1">0-1</option>
                                        <option value="2-5">2-5</option>
                                        <option value="6-10">6-10</option>
                                        <option value="10">10+</option>
                                    </select>
                                </div>
                                <div className={styles.formPiece}>
                                    <input
                                        type="checkbox"
                                        id="special"
                                        name="special"
                                        value="special"
                                        onChange={(e) => setSpecialAdoption(e.target.checked)} />
                                    <label htmlFor="special"> Show dogs classified as "special adoption"</label>
                                </div>
                            </div>
                            <button type="submit">Search</button>
                        </form>
                        <div className={styles.dogs}>
                        {dogs.map(dog => (
                            <div className={styles.dogCard} key={dog._id}>
                                <p>Name: {dog.name}</p>
                                <p>Estimated age: {dog.age}</p>
                                <p>Special adoption: {dog.special_adoption ? "Yes" : "No"}</p>
                                <p>Size: {dog.size}</p>
                                <p>Organisation: {dog.organisation}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default DogSearch