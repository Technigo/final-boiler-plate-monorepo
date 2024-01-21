import { dogStore } from "../stores/dogStore.jsx";
import { useState } from "react";
import styles from "../styles/UserProfile.module.css"

export const AddDogs = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        size: "small",
        special_adoption: false,
        organisation: "Choose your organisation",
    });

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
                <div className={styles.formContainer}>
                    <form onSubmit={onFormSubmit}>
                        <label htmlFor="name">Name: </label>
                        <input
                            name="name"
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <label htmlFor="age">Estimated age: </label>
                        <input
                            name="age"
                            id="age"
                            type="text"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />
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
                        <input
                            type="checkbox"
                            id="special"
                            name="special"
                            value={formData.special_adoption}
                            onChange={(e) => setFormData({ ...formData, special_adoption: e.target.checked, })}
                        />
                        <label htmlFor="special"> Special adoption</label>
                        <label htmlFor="organisation">Organisation: </label>
                        <select
                            name="organisation"
                            id="organisation"
                            value={formData.organisation}
                            onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                        >
                            <option value="Choose your organisation" disabled selected>Choose your organisation</option>
                            <option value="Happy Paws">Happy Paws</option>
                            <option value="The Dog Rescue Foundation">The Dog Rescue Foundation</option>
                            <option value="Mary's Shelter">Mary's Shelter</option>
                            <option value="Woof Woof Foundation">Woof Woof Foundation</option>
                            <option value="From Street to Safety Trust">From Street to Safety Trust</option>
                            <option value="The Furry Friends Shelter">The Furry Friends Shelter</option>
                        </select>
                        <button type="submit">Add Dog</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddDogs