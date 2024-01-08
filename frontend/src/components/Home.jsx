import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRestaurantStore } from "../stores/restaurantStore";

const tablet = `(min-width: 640px)`;
const desktop = `(min-width: 1007px)`;

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
  background-color: white;
  min-height: 100vh;
`;

const Heading = styled.h1`
  font-size: 48px;
  color: #01999a;
  text-align: center;
  font-family: "JosefinSans";

  @media ${tablet} {
    font-size: 60px;
  }
  @media ${desktop} {
    font-size: 60px;
  }
`;

const Subheading = styled.h2`
  font-family: "JosefinSans";
  font-size: 20px;
  text-align: center;
  color: #1bc6c6;

  @media ${tablet} {
    font-size: 30px;
  }
  @media ${desktop} {
    font-size: 30px;
  }
`;
const Intro = styled.p`
  font-size: 16px;
  color: #01999a;
  font-family: "JosefinSans";
  text-align: center;
`;

const StyledButton = styled.button`
  background-color: #fcabe3;
  color: white;
  border: solid white;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  flex-direction: column;
  font-size: 36px;
  font-family: "JosefinSans";
  margin-right: 10px;
  transition-duration: 0.3s;

  &:hover {
    background-color: white;
    color: #01999a;
    border: solid yellow;
  }

  @media ${tablet} {
    background-color: #fcabe3;
    color: white;
    border: solid white;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    flex-direction: column;
    font-size: 36px;
    font-family: "JosefinSans";
    margin: 4px 2px;
    transition-duration: 0.3s;

    &:hover {
      background-color: white;
      color: #01999a;
      border: solid yellow;
    }
  }

  @media ${desktop} {
    background-color: #fcabe3;
    color: white;
    border: solid white;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    flex-direction: column;
    font-size: 45px;
    font-family: "JosefinSans";
    margin: 4px 2px;
    transition-duration: 0.4s;

    &:hover {
      background-color: white;
      color: #01999a;
      border: solid yellow;
    }
  }
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
