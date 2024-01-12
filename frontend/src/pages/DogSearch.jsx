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
    const [dogList, setDogList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/findDogs')
            .then((response) => {
                setDogs(response.data);
                setDogList(response.data); // Save the original list of dogs
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSearch = () => {
        setSearch(true);

        // Filter dogs based on user inputs
        let showDogs = dogList;

        if (organisation.trim() !== '') {
            showDogs = showDogs.filter((dog) => dog.organisation === organisation.trim());
        }

        if (size !== '') {
            showDogs = showDogs.filter((dog) => dog.size === size);
        }

        if (age !== '') {
            showDogs = showDogs.filter((dog) => {
                const [min, max] = age.split('-').map(Number);
                return dog.age >= min && dog.age <= max;
            });
        }

        if (specialAdoption) {
            showDogs = showDogs.filter((dog) => !dog.special_adoption);
        }

        setDogs(showDogs);
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
                        <h2>DOG SEARCH</h2>
                    </div>
                    <div className={styles.searchForm}>
                        <p>Here you can search for all the dogs in our database according to what kind of furry friend you're looking for.</p>
                        <p>There are currently dogs from 6 different animal rescue organisations available for adoption.</p>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch(); // Call the handleSearch function when the form is submitted
                        }}>
                            <div className={styles.formRow}>
                                <div className={styles.formPiece}>
                                    <label htmlFor="organisation">Organisation</label>
                                    <select
                                        name="organisation"
                                        id="organisation"
                                        onChange={(e) => setOrganisation(e.target.value)}>
                                        <option value="">Any organisation</option>
                                        <option value="Happy Paws">Happy Paws</option>
                                        <option value="The Dog Rescue Foundation">The Dog Rescue Foundation</option>
                                        <option value="Mary's Shelter">Mary's Shelter</option>
                                        <option value="Woof Woof Foundation">Woof Woof Foundation</option>
                                        <option value="From Street to Safety Trust">From Street to Safety Trust</option>
                                        <option value="The Furry Friends Shelter">The Furry Friends Shelter</option>
                                    </select>
                                </div>
                                <div className={styles.formPiece}>
                                    <label htmlFor="size">Size</label>
                                    <select
                                        name="size"
                                        id="size"
                                        onChange={(e) => setSize(e.target.value)}>
                                        <option value="">Any size</option>
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
                                        <option value="">Any age</option>
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
                                    <label htmlFor="special"> Don't show dogs classified as "special adoption"</label>
                                </div>
                            </div>
                            <div className={styles.submitWrapper}>
                                <button type="submit">Search</button>
                            </div>
                        </form>
                        <div className={styles.dogs}>
                            {dogs.length === 0 ? (
                                <div className={styles.notFound}>
                                    <p>Nothing was found based on your search criteria.</p>
                                </div>
                            ) : (
                                dogs.map(dog => (
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
                                ))
                            )}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default DogSearch