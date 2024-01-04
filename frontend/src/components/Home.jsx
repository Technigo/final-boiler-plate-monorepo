import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRestaurantStore } from "../stores/restaurantStore";

// Function to determine the route based on the category
export const getCategoryRoute = (category) => {
  switch (category.toLowerCase()) {
    case "date":
      return "/date";
    case "celebration":
      return "/celebration";
    case "family":
      return "/family";
    case "friends":
      return "/friends";
    case "business":
      return "/business";
    case "other":
      return "/other";
    // Add more cases as needed
    default:
      return "/occasion"; // Default route if category doesn't match
  }
};

const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: white; /* Your chosen color */
  min-height: 100vh; /* Make sure it covers the full height of the viewport */
`;

const Heading = styled.h1`
  font-size: 48px;
  color: #01999a;
  text-align: center;
  font-family: "JosefinSans";
`;

const Subheading = styled.h2`
  font-family: "JosefinSans";
  font-size: 20px;
  text-align: center;
  color: #1bc6c6;
`;

const Intro = styled.p`
  font-size: 16px;
  color: #800f2f;
  font-family: "JosefinSans";
  text-align: center;
  /* Your styles for intro paragraph */
`;
const StyledButton = styled.button`
  background-color: #fcabe3;
  color: white;
  border: solid white;
  padding: 10px 20px; /* Some padding */
  border-radius: 10px; /* Rounded corners */
  cursor: pointer; /* Pointer/hand icon */
  text-align: center; /* Center the text */
  text-decoration: none; /* No underline */
  display: inline-block; /* Inline block element */
  flex-direction: column;
  font-size: 36px; /* Font size */
  font-family: "JosefinSans";
  margin: 4px 2px; /* Margin around the button */
  transition-duration: 0.4s; /* Transition for hover effect */

  &:hover {
    background-color: white;
    color: #01999a;
    border: solid #fcabe3;
  }
`;

// <!-- HTML !-->
// <button class="button-74" role="button">Button 74</button>

const TestButton = styled.button`
  background-color: #fcabe3;
  border: 2px solid #01999a;
  border-radius: 30px;
  box-shadow: #01999a 2px 2px 0 0;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    // Ska bara va på tablet och laptop
    background-color: white;
    color: #01999a;
    border: 4px solid #fcabe3;
  }

  &:active {
    box-shadow: #422800 2px 2px 0 0;
    transform: translate(2px, 2px);
  }

  /* @media $/ {
    min-width: 120px;
    padding: 0 25px; */
  /* } */
`;

// <!-- HTML !-->
// <button class="button-74" role="button">Button 74</button>

const TestButton = styled.button`
  background-color: #fcabe3;
  border: 2px solid #01999a;
  border-radius: 30px;
  box-shadow: #01999a 2px 2px 0 0;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    // Ska bara va på tablet och laptop
    background-color: white;
    color: #01999a;
    border: 4px solid #fcabe3;
  }

  &:active {
    box-shadow: #422800 2px 2px 0 0;
    transform: translate(2px, 2px);
  }

  /* @media $/ {
    min-width: 120px;
    padding: 0 25px; */
  /* } */
`;

const Home = () => {
  // Define text content for the heading and subheading.
  const text = {
    heading: "WHO",
    subheading: "ARE YOU DINING WITH?",
  };

  const { category, fetchCategory, setSelectedCategory } = useRestaurantStore();

  useEffect(() => {
    fetchCategory().catch((error) => {
      console.error("Error fetching category:", error);
    });
  }, [fetchCategory]);

  const handleCategorySelect = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  return (
    <PageContainer>
      <Navbar />
      <main>
        <Heading>{text.heading}</Heading>
        <Subheading>{text.subheading}</Subheading>
        <Intro>
          {category.map((category, index) => (
            <StyledButton
              key={index}
              onClick={() => handleCategorySelect(category)}
              as={Link}
              to={getCategoryRoute(category)}
            >
              {category}
            </StyledButton>
          ))}
        </Intro>
      </main>
      <Footer />
    </PageContainer>
  );
};

export default Home;
