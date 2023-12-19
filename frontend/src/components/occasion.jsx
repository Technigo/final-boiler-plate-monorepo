import React, { useEffect } from 'react';
import Navbar from './navbar'; // Ensure the path is correct
import Footer from './footer'; // Ensure the path is correct
import styled from 'styled-components';
import { useRestaurantStore } from '../stores/restaurantStore'; // Ensure the path is correct

// Styled components, change to fit our stylingschema
const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: #FBB7C0; /* Your chosen color */
  min-height: 100vh; /* Make sure it covers the full height of the viewport */
`;

const OccasionButton = styled.button`
  margin: 0.5em;
  padding: 0.5em 1em;
  border: none;
  background-color: ${({ selected }) => selected ? '#a5d6a7' : '#efefef'};
  font-size: 16px;
  cursor: pointer;
`;

const OccasionSelectorContainer = styled.div`
  font-size: 20px;
  font-family: Arial, sans-serif;
`;

const OccasionSelector = () => {
  const { occasions, selectedOccasion, fetchOccasions, setSelectedOccasion } = useRestaurantStore();

  useEffect(() => {
    fetchOccasions();
  }, [fetchOccasions]);

  const handleOccasionSelect = (occasion) => {
    setSelectedOccasion(occasion);
  };

  return (
    <PageContainer>
      <Navbar />
      <OccasionSelectorContainer>
        <h2>Here you decide what you have planned</h2>
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
      <Footer />
    </PageContainer>
  );
};

export default OccasionSelector;