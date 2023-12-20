import React, { useState } from 'react';

const AddRestaurantForm = () => {
    const [formData, setFormData] = useState({
        restaurantName: '',
        address: '',
        zipcode: '',
        city: '',
        country: '',
        borough: '',
        cuisine: '',
        occasion: [],
        mood: [],
        description: '',
        url: ''
    });

    const handleChange = (e) => {
        if (e.target.name === "occasion" || e.target.name === "mood") {
            // For multiselect fields
            const options = e.target.options;
            const values = [];
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    values.push(options[i].value);
                }
            }
            setFormData({
                ...formData,
                [e.target.name]: values
            });
        } else {
            // For regular input fields
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // POST request to the server
        fetch('http://localhost:3000/api/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Handle success - clear the form or show a success message
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here, such as showing an error message
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add a New Restaurant</h1>
            {/* Input fields for each property in your schema */}
            <label>
                Restaurant Name:
                <input type="text" name="restaurantName" value={formData.restaurantName} onChange={handleChange} />
            </label><br /><br />
            {/* Repeat for other fields like address, zipcode, city, country, etc. */}
            {/* Occasion (multi-select example) */}
            <label>
                Occasion:
                <select multiple name="occasion" value={formData.occasion} onChange={handleChange}>
                    {/* List of occasions */}
                    <option value="Have dinner with the in-laws">Have dinner with the in-laws</option>
                    {/* Repeat for other occasions */}
                </select>
            </label><br /><br />
            {/* Mood (multi-select example) */}
            <label>
                Mood:
                <select multiple name="mood" value={formData.mood} onChange={handleChange}>
                    {/* List of moods */}
                    <option value="Cozy">Cozy</option>
                    {/* Repeat for other moods */}
                </select>
            </label><br /><br />
            {/* Add fields for description and URL */}
            <label>
                Description:
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            </label><br /><br />
            <label>
                URL:
                <input type="text" name="url" value={formData.url} onChange={handleChange} />
            </label><br /><br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddRestaurantForm;

