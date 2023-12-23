import Navbar from './navbar'; // Ensure the path is correct
import Footer from './footer'; // Ensure the path is correct
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRestaurantStore } from '../stores/restaurantStore'; 

const ResultsContainer = styled.div`
  /* Style for your results container */
  margin: 0 auto;
  padding: 20px;
  background-color: #FFF0F3; /* Your chosen color */
`;

const NoResultsText = styled.p`
  color: #800F2F; /* Dark red color */
  font-family: Montserrat, sans-serif; /* Montserrat font */
  text-align: center; /* Centers the title text */
  margin-bottom: 20px; /* Adds some space between the title and the buttons */
`;

const ResultCard = styled.div`
  /* Style for each result card */
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #FFF0F3; /* Your chosen color */
`;

const BackButton = styled.button`
background-color: #FFCCD5;
  color: #800F2F;
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

  &:hover {
    background-color: #FF8FA3;
    color: #590D22;
  }

  &:active {
    transform: translateY(1px);
  }
`;
const ResultsComponent = () => {
  const { results, fetchResults, selectedOccasion, selectedMoods } = useRestaurantStore();

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
            <NoResultsText>We are sad to say we cannot find anything that fits your needs. Please try again!</NoResultsText>
          )}
          <Link to="/mood">
        <BackButton>
          Go back to choose moods
        </BackButton>
      </Link>
       </ResultsContainer>

      <Footer />
    </>
  );
};

export default ResultsComponent;