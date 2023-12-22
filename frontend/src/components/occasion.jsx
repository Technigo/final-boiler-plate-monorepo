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
  background-color: #FBB7C0; /* Your chosen color */
  min-height: 100vh; /* Make sure it covers the full height of the viewport */
`;

const TitleContainer = styled.div`
  text-align: center; /* Centers the title text */
  margin-bottom: 20px; /* Adds some space between the title and the buttons */
`;

const OccasionButton = styled.button`
  margin: 0.5em;
  padding: 0.5em 1em;
  border: none;
  background-color: ${({ selected }) => selected ? '#a5d6a7' : '#efefef'};
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${({ selected }) => selected ? '#B89685' : '#ddd'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;
const OccasionSelectorContainer = styled.div`
  display: flex; /* Enables Flexbox */
  flex-wrap: wrap; /* Allows items to wrap to the next line */
  justify-content: space-around; /* Distributes space around items */
  align-items: flex-start; /* Aligns items to the start */
  gap: 10px; /* Adds a gap between buttons */
  width: 100%; /* Ensures the container takes full width */
  max-width: 1200px; /* Sets a max-width for the container */
  margin: 0 auto; /* Centers the container in the parent */
`;

const NextButton = styled.button`
  padding: 0.5em 1em;
  margin-top: 20px; // Provide some space above the button
  background-color: #4caf50; // A color that stands out for primary actions
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  display: block; // So it doesn't inline
  margin-left: auto;
  margin-right: auto;
  &:hover {
    background-color: #45a049;
  }
`;

const OccasionSelector = () => {
  const { occasions, selectedOccasion, fetchOccasions, setSelectedOccasion } = useRestaurantStore();

  useEffect(() => {
    setSelectedOccasion(null);
    fetchOccasions();
  }, [fetchOccasions, setSelectedOccasion]);

  const handleOccasionSelect = (occasion) => {
    setSelectedOccasion(occasion);
  };

  return (
    <>
      <PageContainer>
        <Navbar />
        <TitleContainer>
          <h2>Here you decide what you have planned</h2>
        </TitleContainer>
        <OccasionSelectorContainer>
          {occasions && occasions.length > 0 ? (
            occasions.map((occasion, index) => (
              <OccasionButton
                key={index}
                onClick={() => handleOccasionSelect(occasion)}
                selected={selectedOccasion === occasion}
              >
                {occasion}
              </OccasionButton>
            ))
          ) : (
            <p>Loading occasions...</p> // or some other placeholder
          )}
        </OccasionSelectorContainer>
        {selectedOccasion && (
          <Link to="/mood"> {/* This will navigate to mood selection when clicked */}
            <NextButton>
              Next
            </NextButton>
          </Link>
        )}
        <Footer />
      </PageContainer>
    </>
  );
};

export default OccasionSelector;