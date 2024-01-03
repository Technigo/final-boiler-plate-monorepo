import React, { useEffect, useState } from "react";
import Navbar from "./navbar"; // Ensure the path is correct
import Footer from "./footer"; // Ensure the path is correct
import styled from "styled-components";
import { useRestaurantStore } from "../stores/restaurantStore"; // Ensure the path is correct
import { Link } from "react-router-dom";

// Styled components, change to fit our stylingschema
const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: white; // Your chosen color: ;
  min-height: 100vh; // Full height of the viewport
`;
const TitleContainer = styled.div`
  text-align: center; /* Centers the title text */
  margin-bottom: 20px; /* Adds some space between the title and the buttons */
  color: #01999a;
  font-family: Montserrat, sans-serif;
`;
const MoodSelectorContainer = styled.div`
  display: flex; /* Enables Flexbox */
  flex-wrap: wrap; /* Allows items to wrap to the next line */
  justify-content: space-around; /* Distributes space around items */
  align-items: flex-start; /* Aligns items to the start */
  gap: 10px; /* Adds a gap between buttons */
  width: 100%; /* Ensures the container takes full width */
  max-width: 1200px; /* Sets a max-width for the container */
  margin: 0 auto; /* Centers the container in the parent */
`;

const MoodButton = styled.button`
  background-color: #ffccd5;
  color: #800f2f;
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
  background-color: ${(props) => (props.selected ? "#FF8FA3" : "#FFCCD5")};

  &:hover {
    background-color: #ff8fa3;
    color: #590d22;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ResultsButton = styled.button`
  background-color: #ffccd5;
  color: #800f2f;
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
  background-color: ${(props) =>
    props.$clicked ? "#SomeColorForClickedState" : "#FFCCD5"};

  &:hover {
    background-color: #ff8fa3;
    color: #590d22;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const MoodSelector = () => {
  const {
    selectedOccasion,
    fetchMoodsForOccasion,
    moods,
    selectedMoods,
    setSelectedMoods,
    fetchResults,
  } = useRestaurantStore();

  const [resultsButtonClicked, setResultsButtonClicked] = useState(false);

  useEffect(() => {
    if (selectedOccasion) {
      fetchMoodsForOccasion(selectedOccasion);
    }
  }, [fetchMoodsForOccasion, selectedOccasion]);

  const handleMoodClick = (mood) => {
    setSelectedMoods(mood);
  };

  const handleResultsButtonClick = async () => {
    if (selectedMoods.length > 0 && selectedMoods.length <= 3) {
      setResultsButtonClicked(true);
      await fetchResults();
    } else {
      console.log("Please select between 1 and 3 moods.");
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <TitleContainer>
        <h2>Select your mood(s)</h2>
        <p>You can select a minimum of one mood and a maximum of three moods</p>
      </TitleContainer>
      <MoodSelectorContainer>
        {moods.map((mood) => (
          <MoodButton
            key={mood}
            onClick={() => handleMoodClick(mood)}
            selected={selectedMoods.includes(mood)}
          >
            {mood}
          </MoodButton>
        ))}
      </MoodSelectorContainer>
      <Link to="/occasion">
        <MoodButton onClick={handleResultsButtonClick}>
          Back to occasion
        </MoodButton>
      </Link>
      <Link to="/result">
        <ResultsButton
          onClick={handleResultsButtonClick}
          $clicked={resultsButtonClicked}
        >
          Give me my results
        </ResultsButton>
      </Link>

      <Footer />
    </PageContainer>
  );
};

export default MoodSelector;
