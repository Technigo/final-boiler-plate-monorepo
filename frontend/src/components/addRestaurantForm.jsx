import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./navbar";
import Footer from "./footer";
import { useRestaurantStore } from "../stores/restaurantStore";

const tablet = `(min-width: 640px)`;
const desktop = `(min-width: 1007px)`;

const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  min-height: 100vh;
`;

const StyledH1 = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #01999a;
  font-family: "JosefinSans";

  @media ${tablet} {
    font-size: 40px;
  }

  @media ${desktop} {
    font-size: 45px;
  }
`;

const StyledH2 = styled.h2`
  color: #01999a;
  font-family: "JosefinSans";
  text-align: center;
  display: block;
  margin-bottom: 5px;
  font-size: 20px;

  @media ${tablet} {
    font-size: 25px;
  }

  @media ${desktop} {
    font-size: 30px;
  }
`;

const StyledInput = styled.input`
  color: #01999a;
  font-family: "JosefinSans";
  text-align: left;
  margin-top: 5px;
  margin-bottom: 20px;
  width: 90%;
  padding: 8px;
  border: 2px solid #01999a;
  border-radius: 4px;
  background-color: #fcfce1;
`;

const FormLabel = styled.label`
  color: #017f7f;
  font-family: "JosefinSans";
  display: block;
  margin-bottom: 5px;
`;

const Button = styled.button`
  background-color: white;
  color: #01999a;
  padding: 10px 20px;
  font-family: "JosefinSans";
  border: solid #01999a;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;

  &:hover {
    background-color: #01999a;
    color: white;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const StyledParagraph = styled.p`
  color: #01999a;
  font-family: "JosefinSans";
  text-align: left;
  margin-bottom: 10px;
`;

const StyledOccasionsContainer = styled.div`
  color: #01999a;
  display: flex;
  flex-direction: column;
`;

const StyledMoodsContainer = styled.div`
  color: #01999a;
  display: flex;
  flex-direction: column;
`;

const predefinedOccasions = [
  "Have dinner with the in-laws",
      "Have a sunday funday aka brunch",
      "Have dinner with kids present",
      "Have dinner with your bestie",
      "Have dinner with friends to catch up",
      "Say Cheers- a classic Swedish after work",
      "Have dinner with colleagues",
      "Have dinner with the whole family",
      "Have dinner with your parents",
      "Impress your date and the sky is the limit",
      "Impress your date on a tight budget",
      "Celebrate a relationship anniversary",
      "Celebrate you turning 28 again (honey, you ain't fooling anyone)",
      "Have a meparty aka dinner for one",
      "Go on a nice date with that special someone"
];

const predefinedMoods = [
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
const AddRestaurantForm = () => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    address: "",
    zipcode: "",
    city: "",
    country: "",
    borough: "",
    cuisine: "",
    occasion: [],
    mood: [],
    description: "",
    url: "",
    name: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? [...prevData[name], value] : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <StyledH2>Are you a Foodie who can sense the Moodie?</StyledH2>
      <StyledH1>Add your own!</StyledH1>
      <form action="https://formsubmit.co/foodiemoodieappen@gmail.com" method="POST">
      <FormLabel>Restaurant Name*:</FormLabel>
        <StyledInput
          type="text"
          name="restaurantName"
          value={formData.restaurantName}
          onChange={handleChange}
          required
        />
        <FormLabel>Address:</FormLabel>
        <StyledInput
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <FormLabel>Zipcode:</FormLabel>
        <StyledInput
          type="number"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
        />
        <FormLabel>City*:</FormLabel>
        <StyledInput
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <FormLabel>Country:</FormLabel>
        <StyledInput
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <FormLabel>Borough:</FormLabel>
        <StyledInput
          type="text"
          name="borough"
          value={formData.borough}
          onChange={handleChange}
        />
        <FormLabel>Cuisine*:</FormLabel>
        <StyledInput
          type="text"
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
          required
        />
        {/* Occasion checkboxes */}
        <StyledOccasionsContainer>
          <FormLabel>Tick the boxes with suiting occasions*:</FormLabel>
          {predefinedOccasions.map((option, index) => (
            <label key={index}>
              {option}
              <input type="checkbox" name="occasion" value={option} checked={formData.occasion.includes(option)} onChange={handleChange} />
            </label>
          ))}
        </StyledOccasionsContainer>

        {/* Mood checkboxes */}
        <StyledMoodsContainer>
          <FormLabel>Tick the boxes with suiting moods*:</FormLabel>
          {predefinedMoods.map((option, index) => (
            <label key={index}>
              {option}
              <input type="checkbox" name="mood" value={option} checked={formData.mood.includes(option)} onChange={handleChange} />
            </label>
          ))}
        </StyledMoodsContainer>
        <br></br> <br></br>
        <FormLabel>Your description of the restaurant*:</FormLabel>
        <StyledInput
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <FormLabel>Website URL:</FormLabel>
        <StyledInput
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
        />
        <FormLabel>Your name:</FormLabel>
        <StyledInput
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <FormLabel>Your e-mail (in case we need some more info):</FormLabel>
        <StyledInput
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
                <StyledParagraph>Fields marked with * are mandatory.</StyledParagraph>
        <Button type="submit">Submit</Button>
      </form>
      <Footer />
    </PageContainer>
  );
};

export default AddRestaurantForm;