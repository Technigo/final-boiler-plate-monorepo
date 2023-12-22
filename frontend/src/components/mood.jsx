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
  background-color: ${({ selected }) => selected ? '#B89685' : '#efefef'};
  color: ${({ selected }) => selected ? 'white' : 'black'};  // Text color
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

const MoodSelector = () => {
  const { moods, selectedMoods, fetchMoods, setSelectedMoods, fetchResults } = useRestaurantStore();
  

  useEffect(() => {
    setSelectedMoods([]);
    fetchMoods();
  }, [fetchMoods, setSelectedMoods]);


  const handleMoodSelect = (mood) => {
    setSelectedMoods((prevSelectedMoods) => {
      console.log('Setting selected moods:', mood);
      const isSelected = prevSelectedMoods.includes(mood);
      // If the mood is already selected, remove it from the array
      if (isSelected) {
        return { selectedMoods: state.selectedMoods.filter(selectedMood => selectedMood !== mood) };
      }
    
      // If less than 3 moods are selected, add the new mood
      if (state.selectedMoods.length < 3) {
        return { selectedMoods: [...prevSelectedMoods, mood] };
      }
    
      // If already 3 moods are selected and the new mood is not one of them, ignore the selection
      return { selectedMoods: prevSelectedMoods };
    });
  };

  const handleMoodClick = (mood) => {
    console.log(`Clicked on mood: ${mood}`);
    handleMoodSelect(mood);
  };

  const handleResultsButtonClick = async () => {
    if (selectedMoods.length === 0) {
      // You can handle this case if needed
      console.log('Please choose at least one mood.');
      return;
    }

    if (selectedMoods.length > 3) {
      // You can handle this case if needed
      console.log('Please choose a maximum of three moods.');
      return;
    }

    // You can perform any actions related to fetching results here
    await fetchResults(selectedMoods);
  };


  return (
    <PageContainer>
      <Navbar />
      <TitleContainer>
        <h2>Select your mood(s)</h2>
        <p>You can select a minimum of one mood and a maximum of 3 moods</p>
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
      <Link to="/result">
        <ResultsButton onClick={handleResultsButtonClick}>
          Give me my results
        </ResultsButton>
      </Link>
      <Link to="/occasion">
        <button>Go back to choose occasion</button>
      </Link>
      <Footer />
    </PageContainer>
  );
};

export default MoodSelector;

