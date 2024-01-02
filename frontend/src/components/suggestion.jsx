import React, { useState } from 'react'; // Import useState here
import Navbar from './navbar';
import Footer from './footer';
import styled from 'styled-components';
import { Link } from "react-router-dom";

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

const BackButton = styled.button`
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

const Suggestion = () => {
    const [formData, setFormData] = useState({
        restaurantName: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <PageContainer>
            <Navbar />
            <StyledH1>Suggest changes to the restaurants description</StyledH1>
            <form 
                action="https://formsubmit.co/foodiemoodieappen@gmail.com"
                method="POST"
            >
                <FormLabel>Restaurant Name*:</FormLabel>
                <StyledInput 
                    type="text" 
                    name="restaurantName" 
                    value={formData.restaurantName} 
                    onChange={handleChange} 
                    required // Add required attribute
                />

                <FormLabel>Your Description Suggestion*:</FormLabel>
                <StyledInput 
                    type="text" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    required // Add required attribute
                />

                {/* Hidden input for redirection and multiple email addresses */}
                <input type="hidden" name="_cc" value="foodiemoodieappen@gmail.com" />

                <StyledParagraph>Fields marked with * are mandatory.</StyledParagraph>
                <Button type="submit">Submit</Button>
                <Link to="/result">
                    <BackButton>
                        Go back to results
                    </BackButton>
                </Link>
            </form>
            <Footer />
        </PageContainer>
    );
};

export default Suggestion;
