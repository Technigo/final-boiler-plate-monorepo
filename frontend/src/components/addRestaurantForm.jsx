import React, { useState } from 'react';

const AddRestaurantForm = () => {
    const [formData, setFormData] = useState({
        restaurantName: '',
        city: '',
        // Add other fields as needed
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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
            <label>
                Restaurant Name:
                <input
                    type="text"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleChange}
                />
            </label>
            <br /><br />
            <label>
                City:
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                />
            </label>
            <br /><br />
            {/* Add other fields similarly */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddRestaurantForm;
