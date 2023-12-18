import Navbar from './navbar'; // Ensure the path is correct
import Footer from './footer'; // Ensure the path is correct
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useRestaurantStore } from '../stores/restaurantStore'; 

const ResultsContainer = styled.div`
  /* Style for your results container */
  margin: 0 auto;
  padding: 20px;
`;

const ResultCard = styled.div`
  /* Style for each result card */
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const ResultsComponent = () => {
  const { results, fetchResults, selectedOccasion, selectedMoods } = useStore();

  useEffect(() => {
    // selectedMoods is an array, so you might need to adjust how you're fetching results
    // depending on how the backend expects to receive multiple mood values.
    if (selectedOccasion && selectedMoods.length > 0) {
      fetchResults();
    }
  }, [selectedOccasion, selectedMoods, fetchResults]);

  return (
    <>
      <Navbar />
      <ResultsContainer>
        {results.length > 0 ? (
          results.map((restaurant) => (
            <ResultCard key={restaurant._id}>
              <h2>{restaurant.restaurantName}</h2>
              <p>{restaurant.address}</p>
              <p>{restaurant.zipcode}</p>
              <p>{restaurant.city}</p>
              <p>{restaurant.borough}</p>
              <p>{restaurant.cuisine}</p>
              <p>{`Occasion: ${restaurant.occasion.join(', ')}`}</p>
              <p>{`Mood: ${restaurant.mood.join(', ')}`}</p>
              <p>{restaurant.description}</p>
              <a href={restaurant.url}>Visit Website</a>
            </ResultCard>
          )) //click more to get more text//
        ) : (
          <p>No results to display. Please select an occasion and mood(s).</p>
        )}
      </ResultsContainer>
      <Footer />
    </>
  );
};

export default ResultsComponent;