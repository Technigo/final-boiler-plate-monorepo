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

const MoodSelectorContainer = styled.div`
  font-size: 20px;
  font-family: Arial, sans-serif;
`;

const MoodButton = styled.button`
  margin: 0.5em;
  padding: 0.5em 1em;
  border: none;
  background-color: #efefef; // CHANGE COLORS AFTER COLOR SCHEMA!!!!
  font-size: 16px;
  cursor: pointer;

  // Change the background color when the mood is selected
  ${({ selected }) => selected && `
    background-color: #a5d6a7; // CHANGE COLORS AFTER COLOR SCHEMA!!!!
  `}
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
      <MoodSelectorContainer>
        <h2>Select your mood(s)</h2>
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
      <Footer />
    </PageContainer>
  );
};

export default MoodSelector;

