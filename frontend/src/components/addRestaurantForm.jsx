import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from './navbar';
import Footer from './footer';

const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: #FBB7C0; /* Your chosen color */
  min-height: 100vh; /* Make sure it covers the full height of the viewport */
`;

const OccasionButton = styled.button`
  margin: 0.5em;
  padding: 0.5em 1em;
  border: none;
  background-color: ${({ selected }) => selected ? '#a5d6a7' : '#efefef'};
  font-size: 16px;
  cursor: pointer;
`;

const OccasionSelectorContainer = styled.div`
  font-size: 20px;
  font-family: Arial, sans-serif;
`;

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

    const occasionOptions = [
        "Have dinner with the in-laws",
        "Have a sunday funday aka brunch",
        "Have dinner with kids present",
        "Have dinner with your bestie",
        "Have dinner with friends to catch up",
        "Say Cheers- a classic Swedish after work",
        "Have dinner with colleagues",
        "Have dinner with the whole family",
        "Have dinner with your parents",
        "Celebrate you turning 28 again (honey, you ain't fooling anyone)",
        "Have a meparty aka dinner for one",
        "Go on a nice date with that special someone"
    ];

    const moodOptions = [
        "Cozy",
        "Good lighting",
        "Soft-spoken",
        "Bustling",
        "Intimate",
        "Casual",
        "Sophisticated",
        "Family friendly",
        "Homely",
        "Kid friendly",
        "Dog friendly",
        "Calm",
        "Vegan option",
        "Extended dining hours",
        "Romantic"
    ];

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === "occasion" || name === "mood") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked
                    ? [...prevData[name], value]
                    : prevData[name].filter((item) => item !== value),
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
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
        <PageContainer>
    
            <Navbar />
            <form onSubmit={handleSubmit}>
                <h1>Add a New Restaurant</h1>
                {/* Input fields for each property in your schema */}
                {/* ... (other fields) ... */}
    
                {/* Occasion (checkboxes) */}
                <div>
                    <p>Occasion:</p>
                    {occasionOptions.map((option) => (
                        <label key={option}>
                            {option}
                            <input
                                type="checkbox"
                                name="occasion"
                                value={option}
                                checked={formData.occasion.includes(option)}
                                onChange={handleChange}
                            />
                        </label>
                    ))}
                </div>
                <br />
                
                {/* Mood (checkboxes) */}
                <div>
                    <p>Mood:</p>
                    {moodOptions.map((option) => (
                        <label key={option}>
                            {option}
                            <input
                                type="checkbox"
                                name="mood"
                                value={option}
                                checked={formData.mood.includes(option)}
                                onChange={handleChange}
                            />
                        </label>
                    ))}
                </div>
                <br />
                
                {/* Add fields for description and URL */}
                {/* ... (description and URL fields) ... */}
                
                <button type="submit">Submit</button>
            </form>
            <Footer />
        </PageContainer>
    );
};

export default AddRestaurantForm;



