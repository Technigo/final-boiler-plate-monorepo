import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './navbar';
import Footer from './footer';
import { useRestaurantStore } from '../stores/restaurantStore'; 
import emailjs from 'emailjs-com';


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
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevData => ({
        ...prevData,
        [name]: checked ? [...prevData[name], value] : prevData[name].filter(item => item !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <StyledH1>Add a New Restaurant</StyledH1>
      <form 
        action="https://formsubmit.co/foodiemoodieappen@gmail.com"
        method="POST"
      >
        <FormLabel>Restaurant Name*:</FormLabel>
        <StyledInput type="text" name="restaurantName" value={formData.restaurantName} onChange={handleChange} />
        <FormLabel>Address:</FormLabel>
                <StyledInput type="text" name="address" value={formData.address} onChange={handleChange} />

                <FormLabel>Zipcode:</FormLabel>
                <StyledInput type="number" name="zipcode" value={formData.zipcode} onChange={handleChange} />

                <FormLabel>City*:</FormLabel>
                <StyledInput type="text" name="city" value={formData.city} onChange={handleChange} />

                <FormLabel>Country:</FormLabel>
                <StyledInput type="text" name="country" value={formData.country} onChange={handleChange} />

                <FormLabel>Borough:</FormLabel>
                <StyledInput type="text" name="borough" value={formData.borough} onChange={handleChange} />

                <FormLabel>Cuisine*:</FormLabel>
                <StyledInput type="text" name="cuisine" value={formData.cuisine} onChange={handleChange} />
        {/* Ensure each input has a name attribute for FormSubmit to work */}

        {/* Occasion checkboxes */}
        <div>
          <FormLabel>Occasion*:</FormLabel>
          {occasions.map((option, index) => (
            <label key={index}>
              {option}
              <StyledInput type="checkbox" name="occasion" value={option} checked={formData.occasion.includes(option)} onChange={handleChange} />
            </label>
          ))}
        </div>

        {/* Mood checkboxes */}
        <div>
          <FormLabel>Mood*:</FormLabel>
          {moods.map((option, index) => (
            <label key={index}>
              {option}
              <StyledInput type="checkbox" name="mood" value={option} checked={formData.mood.includes(option)} onChange={handleChange} />
            </label>
          ))}
        </div>

        <FormLabel>Description*:</FormLabel>
        <StyledInput type="text" name="description" value={formData.description} onChange={handleChange} />

        <FormLabel>Website URL:</FormLabel>
        <StyledInput type="text" name="url" value={formData.url} onChange={handleChange} />

        <FormLabel>Your name:</FormLabel>
        <StyledInput type="text" name="url" value={formData.url} onChange={handleChange} />

        <FormLabel>Your e-mail (in case we need some more info):</FormLabel>
        <StyledInput type="text" name="url" value={formData.url} onChange={handleChange} />

        {/* Hidden input for redirection and multiple email addresses */}
        <input type="hidden" name="_cc" value="foodiemoodieappen@gmail.com" />

        <StyledParagraph>Fields marked with * are mandatory.</StyledParagraph>
        <Button type="submit">Submit Form</Button>
      </form>
      <Footer />
    </PageContainer>
  );
};

export default AddRestaurantForm;

/*
  form e-mail with https://formsubmit.co/
*/