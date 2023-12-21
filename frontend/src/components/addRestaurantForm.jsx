import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './navbar';
import Footer from './footer';
import { useRestaurantStore } from '../stores/restaurantStore'; 

const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: #FBB7C0; /* Your chosen color */
  min-height: 100vh; /* Make sure it covers the full height of the viewport */
`;


const Button = styled.button`
background-color: #B6244F;
  color: #504746;
  padding: 10px 20px; /* Some padding */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer/hand icon */
  text-align: center; /* Center the text */
  text-decoration: none; /* No underline */
  display: inline-block; /* Inline block element */
  font-size: 16px; /* Font size */
  margin: 4px 2px; /* Margin around the button */
  transition-duration: 0.4s; /* Transition for hover effect */

  &:hover {
    background-color: #B89685;
    color: #FBB7C0;
  }
`;


const AddRestaurantForm = () => {
    const { occasions, moods, fetchOccasions, fetchMoods } = useRestaurantStore();
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


    useEffect(() => {
        fetchOccasions();
        fetchMoods();
      }, [fetchOccasions, fetchMoods]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        if (type === 'checkbox') {
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
        fetch('http://localhost:3000/api/addrestaurant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
    };

    return (
        <PageContainer>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <h1>Add a new restaurant</h1>
                <label>
                    Restaurant Name:
                    <input
                        type="text"
                        name="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Zipcode:
                    <input
                        type="number"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Borough:
                    <input
                        type="text"
                        name="borough"
                        value={formData.borough}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Cuisine:
                    <input
                        type="text"
                        name="cuisine"
                        value={formData.cuisine}
                        onChange={handleChange}
                    />
                </label>
                <br />
                
                {/* Occasion (checkboxes) */}
                <div>
                <p>Occasion:</p>
                {occasions.map((option) => (
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
                {moods.map((option) => (
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
                
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
                <br />

                {/* URL input */}
                <label>
                    Website URL:
                    <input
                        type="text"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                    />
                </label>
                <br />
                
                <Button type="submit">Submit</Button>
            </form>
            <Footer />
        </PageContainer>
    );
};

export default AddRestaurantForm;