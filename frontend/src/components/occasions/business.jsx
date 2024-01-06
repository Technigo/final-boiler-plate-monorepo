import React, { useState } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import styled from "styled-components";
import { useRestaurantStore } from "../../stores/restaurantStore.jsx";
import { Link } from "react-router-dom";
import { getCategoryRoute } from "../Home";

const tablet = `(min-width: 640px)`;
const desktop = `(min-width: 1007px)`;

const PageContainer = styled.div`
  font-family: "JosefinSans";
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  min-height: 100vh;
`;

const TitleContainer = styled.div`
  text-align: center;
  font-family: "JosefinSans";
  font-size: 25px;
  margin-bottom: 20px;
  color: #01999a;

  @media ${tablet} {
    font-size: 35px;
  }
  @media ${desktop} {
    font-size: 35px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const BackButton = styled.button`
  background-color: white;
  color: #01999a;
  border: solid #01999a;
  padding: 10px 20px; 
  border-radius: 10px; 
  cursor: pointer; 
  text-align: center; 
  text-decoration: none; 
  display: inline-block; 
  flex-direction: column;
  font-size: 20px; 
  font-family: "JosefinSans";
  margin: 4px 2px; 
  transition-duration: 0.4s; 

  &:hover {
    background-color: white;
    color: yellow;
    border: solid #fcabe3;
  }

  &:active {
    transform: translateY(1px);
  }

  @media ${tablet} {
  background-color: white;
  color: #01999a;
  border: solid #01999a;
  padding: 10px 20px; /* Some padding */
  border-radius: 10px; /* Rounded corners */
  cursor: pointer; /* Pointer/hand icon */
  text-align: center; /* Center the text */
  text-decoration: none; /* No underline */
  display: inline-block; /* Inline block element */
  flex-direction: column;
  font-size: 25px; /* Font size */
  font-family: "JosefinSans";
  margin: 4px 2px; /* Margin around the button */
  transition-duration: 0.4s; /* Transition for hover effect */

  &:hover {
    background-color: white;
    color: yellow;
    border: solid #fcabe3;
  }

  &:active {
    transform: translateY(1px);
  }

  @media ${desktop} {
  background-color: white;
  color: #01999a;
  border: solid #01999a;
  padding: 10px 20px; /* Some padding */
  border-radius: 10px; /* Rounded corners */
  cursor: pointer; /* Pointer/hand icon */
  text-align: center; /* Center the text */
  text-decoration: none; /* No underline */
  display: inline-block; /* Inline block element */
  flex-direction: column;
  font-size: 25px; /* Font size */
  font-family: "JosefinSans";
  margin: 4px 2px; /* Margin around the button */
  transition-duration: 0.4s; /* Transition for hover effect */

  &:hover {
    background-color: white;
    color: yellow;
    border: solid #fcabe3;
  }

  &:active {
    transform: translateY(1px);
  }
  }
`;

const NextButton = styled.button`
  background-color: #fcabe3;
  color: white;
  border: solid yellow;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  flex-direction: column;
  font-size: 20px;
  font-family: "JosefinSans";
  margin: 2px 2px;
  margin-right: auto;
  transition-duration: 0.4s;

  &:hover {
    background-color: white;
    color: yellow;
    border: solid #fcabe3;
  }

  @media ${tablet} {
    background-color: #fcabe3;
    color: white;
    border: solid yellow;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    flex-direction: column;
    font-size: 30px;
    font-family: "JosefinSans";
    margin: 2px 2px;
    margin-right: auto;
    transition-duration: 0.4s;

    &:hover {
      background-color: white;
      color: yellow;
      border: solid #fcabe3;
    }
  }
  @media ${desktop} {
    background-color: #fcabe3;
    color: white;
    border: solid yellow;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    flex-direction: column;
    font-size: 30px;
    font-family: "JosefinSans";
    margin: 2px 2px;
    margin-right: auto;
    transition-duration: 0.4s;

    &:hover {
      background-color: white;
      color: yellow;
      border: solid #fcabe3;
    }
  }
`;

const OccasionButton = styled.button`
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
  font-size: 25px;
  font-family: "JosefinSans";
  margin: 4px 2px;
  transition-duration: 0.4s;

  &:hover,
  &:focus {
    background-color: white;
    color: #01999a;
    border: solid yellow;
  }

  &:active {
    transform: translateY(1px);

    &:focus {
      outline: none;
    }
  }

  @media ${tablet} {
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
    font-size: 35px; /* Font size */
    font-family: "JosefinSans";
    margin: 4px 2px; /* Margin around the button */
    transition-duration: 0.4s; /* Transition for hover effect */

  &:hover,
  &:focus {
    background-color: white;
    color: #01999a;
    border: solid yellow;
  }

  &:active {
    transform: translateY(1px);

  &:focus {
      outline: none;
    }
  }

  @media ${desktop} {
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
    font-size: 35px; /* Font size */
    font-family: "JosefinSans";
    margin: 4px 2px; /* Margin around the button */
    transition-duration: 0.4s; /* Transition for hover effect */

    &:hover,
  &:focus {
    background-color: white;
    color: #01999a;
    border: solid yellow;
  }

  &:active {
    transform: translateY(1px);

    &:focus {
      outline: none;
    }
  }
`;

const OccasionSelectorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const BusinessSelector = () => {
  const { selectedOccasion, setSelectedOccasion } = useRestaurantStore();
  const [isNextButtonVisible, setNextButtonVisible] = useState(false);

  // Business specific occasions
  const businessOccasions = [
    "Say Cheers- a classic Swedish after work",
    "Have dinner with colleagues",
  ];

  const handleOccasionSelect = (occasion) => {
    setSelectedOccasion(occasion);
    setNextButtonVisible(true);
  };

  return (
    <>
      <PageContainer>
        <Navbar />
        <TitleContainer>
          <h2>What kind of business occasion?</h2>
        </TitleContainer>
        <OccasionSelectorContainer>
          {businessOccasions.map((occasion, index) => (
            <OccasionButton
              key={index}
              onClick={() => handleOccasionSelect(occasion)}
              selected={selectedOccasion === occasion}
            >
              {occasion}
            </OccasionButton>
          ))}
        </OccasionSelectorContainer>
        <ButtonContainer>
          <Link to="/">
            <BackButton>Back</BackButton>
          </Link>
          {isNextButtonVisible && (
            <Link
              to={{
                pathname: "/mood",
                state: { occasionRoute: getCategoryRoute(selectedOccasion) },
              }}
            >
              <NextButton>Next</NextButton>
            </Link>
          )}
        </ButtonContainer>
        <Footer />
      </PageContainer>
    </>
  );
};

export default BusinessSelector;
