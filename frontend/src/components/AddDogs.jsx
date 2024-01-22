import { dogStore } from "../stores/dogStore.jsx";
import { useState } from "react";
import styles from "../styles/AddDogs.module.css"

export const AddDogs = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        size: "small",
        special_adoption: false,
        organisation: "Choose your organisation",
    });

    //<input type="file" name="image" onChange={event => setNewCocktailData({ ...newCocktailData, image: event.target.files[0] })}

    const storeAddDogToServer = dogStore((state) => state.addDogToServer);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        // Add validation if needed

        // Call the addDogToServer action with the form data
        await storeAddDogToServer(formData);

        // Clear the form or reset formData state if needed
        setFormData({
            name: "",
            age: "",
            size: "small",
            special_adoption: false,
            organisation: "Choose your organisation",
        });
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <h3>ADD A NEW DOG</h3>
                <div className={styles.formContainer}>
                    <form onSubmit={onFormSubmit}>
                        <div className={styles.formRow}>
                            <div className={styles.formPiece}>
                                <label htmlFor="name">Name: </label>
                                <input
                                    name="name"
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className={styles.formPiece}>
                                <label htmlFor="age">Estimated age: </label>
                                <input
                                    name="age"
                                    id="age"
                                    type="text"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                />
                            </div>
                            <div className={styles.formPiece}>
                                <label htmlFor="size">Size: </label>
                                <select
                                    name="size"
                                    id="size"
                                    value={formData.size}
                                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                >
                                    <option value="small">Small</option>
                                    <option value="medium">Mid-size</option>
                                    <option value="big">Big</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formPiece}>
                                <input
                                    type="checkbox"
                                    id="special"
                                    name="special"
                                    value={formData.special_adoption}
                                    onChange={(e) => setFormData({ ...formData, special_adoption: e.target.checked, })}
                                />
                                <label htmlFor="special"> Special adoption</label>
                            </div>
                            <div className={styles.formPiece}>
                                <label htmlFor="organisation">Organisation: </label>
                                <select
                                    name="organisation"
                                    id="organisation"
                                    value={formData.organisation}
                                    onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}>
                                    <option value="Choose your organisation" disabled>Choose your organisation</option>
                                    <option value="Happy Paws">Happy Paws</option>
                                    <option value="The Dog Rescue Foundation">The Dog Rescue Foundation</option>
                                    <option value="Mary's Shelter">Mary's Shelter</option>
                                    <option value="Woof Woof Foundation">Woof Woof Foundation</option>
                                    <option value="From Street to Safety Trust">From Street to Safety Trust</option>
                                    <option value="The Furry Friends Shelter">The Furry Friends Shelter</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formPiece}>
                                <button type="submit">Add Dog</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddDogs