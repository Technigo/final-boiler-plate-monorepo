import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './navbar';
import Footer from './footer';
import { useRestaurantStore } from '../stores/restaurantStore'; 

const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: #FFF0F3; /* Your chosen color */
  min-height: 100vh; /* Make sure it covers the full height of the viewport */
`;

const StyledH1 = styled.h1`
text-align: center; /* Centers the title text */
margin-bottom: 20px; /* Adds some space between the title and the buttons */
color: #800F2F;
font-family: Montserrat, sans-serif;
`;

const StyledH2 = styled.h2`
color: #800F2F;
font-family: Montserrat, sans-serif;
display: block; /* Ensures each label is on a new line */
margin-bottom: 5px; /* Space above each input */
font-size: 16px;
`;

const StyledInput = styled.input`
  color: #800F2F;
  font-family: Montserrat, sans-serif;
  text-align: left;
  margin-top: 5px; /* Adds spacing between the label text and the input box */
  margin-bottom: 20px; /* Space below each input */
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FormLabel = styled.label`
  color: #800F2F;
  font-family: Montserrat, sans-serif;
  display: block; /* Ensures each label is on a new line */
  margin-bottom: 5px; /* Space above each input */
`;

const Button = styled.button`
background-color: #FFCCD5;
  color: #800F2F;
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
    background-color: #FF8FA3;
    color: #590D22;
  }

  &:active {
    transform: translateY(1px);
  }
`; 

const StyledParagraph = styled.p`
  color: #800F2F; /* Example color */
  font-family: Montserrat, sans-serif; /* Montserrat font */
  text-align: left; /* Text aligned to the left */
  margin-bottom: 10px; /* Space below the paragraph */
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
          <StyledH1>Add a new restaurant</StyledH1>
    
            <FormLabel>
              Restaurant Name*:
              <StyledInput
                type="text"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
              />
            </FormLabel>
            
            <FormLabel>
              Address:
              <StyledInput
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </FormLabel>
            
            <FormLabel>
              Zipcode:
              <StyledInput
                type="number"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
              />
            </FormLabel>
            
            <FormLabel>
              City*:
              <StyledInput
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </FormLabel>
            
            <FormLabel>
              Borough:
              <StyledInput
                type="text"
                name="borough"
                value={formData.borough}
                onChange={handleChange}
              />
            </FormLabel>
            
            <FormLabel>
              Cuisine*:
              <StyledInput
                type="text"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
              />
            </FormLabel>
    
            {/* Occasion (checkboxes) */}
            <div>
            <FormLabel>Occasion*:</FormLabel>
              {occasions.map((option) => (
                <FormLabel key={option}>
                  {option}
                  <StyledInput
                    type="checkbox"
                    name="occasion"
                    value={option}
                    checked={formData.occasion.includes(option)}
                    onChange={handleChange}
                  />
                </FormLabel>
              ))}
            </div>
    
            {/* Mood (checkboxes) */}
            <div>
            <FormLabel>Mood*:</FormLabel>
              {moods.map((option) => (
                <FormLabel key={option}>
                  {option}
                  <StyledInput
                    type="checkbox"
                    name="mood"
                    value={option}
                    checked={formData.mood.includes(option)}
                    onChange={handleChange}
                  />
                </FormLabel>
              ))}
            </div>
    
            <FormLabel>
          Description*:
          <StyledInput
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormLabel>

        {/* Website URL input */}
        <FormLabel>
          Website URL:
          <StyledInput
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />
        </FormLabel>
        <StyledParagraph>Fields marked with an * are mandatory to fill in.</StyledParagraph>
        <Button type="submit">Submit</Button>
      </form>
      <Footer />
    </PageContainer>
  );
};
    
    export default AddRestaurantForm;
 