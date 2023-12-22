import React, { useEffect } from 'react';
import Navbar from './navbar'; // Ensure the path is correct
import Footer from './footer'; // Ensure the path is correct
import styled from 'styled-components';
import { useRestaurantStore } from '../stores/restaurantStore'; // Ensure the path is correct
import { Link } from 'react-router-dom'; 

// Styled components, change to fit our stylingschema
const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: #FBB7C0; // Your chosen color
  min-height: 100vh; // Full height of the viewport
`;
const TitleContainer = styled.div`
  text-align: center; /* Centers the title text */
  margin-bottom: 20px; /* Adds some space between the title and the buttons */
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
  margin: 0.5em;
  padding: 0.5em 1em;
  border: none;
  background-color: ${({ selected }) => selected ? '#a5d6a7' : '#efefef'}; // Same as OccasionButton
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px; // Same as OccasionButton
  transition: background-color 0.3s, transform 0.3s; // Same as OccasionButton

  &:hover {
    background-color: ${({ selected }) => selected ? '#98c9a3' : '#ddd'}; // Same as OccasionButton
    transform: translateY(-2px); // Same as OccasionButton
  }

  &:active {
    transform: translateY(1px); // Same as OccasionButton
  }
`;

const ResultsButton = styled.button`
  padding: 0.5em 1em;
  background-color: #4caf50; // Choose a color that indicates a primary action
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  display: block; // Centers the button
  margin: 20px auto; // Adds top margin and centers horizontally
  &:hover {
    background-color: #45a049;
  }
`;

// MoodSelector component
const MoodSelector = () => {
  const { moods, selectedMoods, fetchMoods, setSelectedMoods } = useRestaurantStore();

  useEffect(() => {
    fetchMoods();
  }, [fetchMoods]);

  //make sure that you can only choose one!
  const handleMoodToggle = (mood) => {
    setSelectedMoods((prevSelectedMoods) => {
      const isSelected = prevSelectedMoods.includes(mood);
      if (isSelected) {
        // Remove mood from the array if it's already selected
        return prevSelectedMoods.filter((m) => m !== mood);
      } else if (prevSelectedMoods.length < 3) {
        // Add mood to the array if less than 3 are already selected
        return [...prevSelectedMoods, mood];
      }
      return prevSelectedMoods; // No change if 3 moods are already selected
    });
  };

  return (
    <PageContainer>
      <Navbar />
      <TitleContainer>
        <h2>Select your mood(s)</h2>
      </TitleContainer>
      <MoodSelectorContainer>
        {moods.map((mood) => (
          <MoodButton
            key={mood}
            onClick={() => handleMoodToggle(mood)}
            selected={selectedMoods.includes(mood)}
          >
            {mood}
          </MoodButton>
        ))}
      </MoodSelectorContainer>
      {/* Link to results page */}
      <Link to="/result">
        <ResultsButton>
          Give me my results
        </ResultsButton>
      </Link>
      <Footer />
    </PageContainer>
  );
};

export default MoodSelector;

