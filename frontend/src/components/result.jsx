import Navbar from './navbar'; // Ensure the path is correct
import Footer from './footer'; // Ensure the path is correct
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
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
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  border-color: #800F2F;
  background-color: #FFF0F3; /* Your chosen color */
  width: 60vw;
`;


const StyledHeading = styled.h2`
font-size: 20px;
font-family: Arial, sans-serif; 
color: #800F2F;
font-family: Montserrat, sans-serif;
`;

const StyledParagraph = styled.p`
font-size: 16px;
color: #800F2F;
font-family: Montserrat, sans-serif;
  /* Your styles for intro paragraph */
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

const StyledButtonLink = styled(Link)`
  background-color: #FFCCD5;
  color: #800F2F;
  padding: 10px 20px; // Some padding
  border: none; // No border
  border-radius: 5px; // Rounded corners
  cursor: pointer; // Pointer/hand icon
  text-align: center; // Center the text
  text-decoration: none; // No underline
  display: inline-block; // Inline block element
  font-size: 16px; // Font size
  margin: 4px 2px; // Margin around the button
  transition-duration: 0.4s; // Transition for hover effect

  &:hover {
    background-color: #FF8FA3;
    color: #590D22;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
`;

const MoreLink = styled.a`
  color: #FF8FA3;
  cursor: pointer;
`;

const TruncatedText = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };

  const resultString = isTruncated ? `${text.substring(0, maxLength)}...` : text;

  return (
    <>
      {resultString}
      {text.length > maxLength && (
        <MoreLink onClick={toggleTruncation}>
          {isTruncated ? ' Read more' : ' Read less'}
        </MoreLink>
      )}
    </>
  );
};

function generateGoogleMapsUrl(address, city, country) {
  const query = encodeURIComponent(`${address}, ${city}, ${country}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

const ResultsComponent = () => {
  const { results, fetchResults, selectedOccasion, selectedMoods } = useRestaurantStore();
  const [sortType, setSortType] = useState('restaurantName');

  useEffect(() => {
    if (selectedOccasion && selectedMoods.length > 0) {
      fetchResults();
    }
  }, [selectedOccasion, selectedMoods, fetchResults]);

  const getSortedResults = () => {
    let sorted = [];
    switch (sortType) {
      case 'restaurantName':
        sorted = [...results].sort((a, b) => a.restaurantName.localeCompare(b.restaurantName));
        break;
      case 'borough':
        sorted = [...results].sort((a, b) => a.borough.localeCompare(b.borough));
        break;
      case 'cuisine':
        sorted = [...results].sort((a, b) => a.cuisine.localeCompare(b.cuisine));
        break;
      default:
        sorted = results; // Return unsorted results if no sortType matches
        break;
    }
    return sorted.map(restaurant => ({
      ...restaurant,
      mapsUrl: generateGoogleMapsUrl(restaurant.address, restaurant.city, restaurant.country)
    }));
  };

  const sortedResults = getSortedResults();

  return (
    <>
      <Navbar />
      {/* Dropdown for selecting sort type */}
      <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
        <option value="restaurantName">Sort by restaurant name</option>
        <option value="borough">Sort by borough</option>
        <option value="cuisine">Sort by cuisine</option>
        {/* Add other sorting options here if needed */}
      </select>
      <ResultsContainer>
        <Link to="/mood">
          <BackButton>Go back to choose moods</BackButton>
        </Link>
        {sortedResults.length > 0 ? (
          sortedResults.map((restaurant) => (
            <ResultCard key={restaurant._id}>
              <StyledHeading>{restaurant.restaurantName}</StyledHeading>
              <StyledParagraph>Borough: {restaurant.borough}</StyledParagraph>
              <StyledParagraph>Cuisine: {restaurant.cuisine}</StyledParagraph>
              <StyledParagraph>
                <TruncatedText text={`Occasion: ${restaurant.occasion.join(', ')}`} maxLength={100} />
              </StyledParagraph>
              <StyledParagraph>Mood: {restaurant.mood.join(', ')}</StyledParagraph>
              <StyledParagraph>
                <TruncatedText text={`Description: ${restaurant.description}`} maxLength={100} />
              </StyledParagraph>
              <StyledParagraph>
                Address: <a href={restaurant.mapsUrl} target="_blank" rel="noopener noreferrer">{`${restaurant.address}, ${restaurant.zipcode} ${restaurant.city}`}</a>
              </StyledParagraph>
              <StyledButtonLink href={restaurant.url} target="_blank" rel="noopener noreferrer">
                Visit the restaurant's website by clicking here
              </StyledButtonLink>
              <br />
              <StyledButtonLink to="/suggestion">
                If you have suggestions about the description, click here.
              </StyledButtonLink>
            </ResultCard>
          ))
        ) : (
          <NoResultsText>We are sad to say we cannot find anything that fits your needs. Please try again!</NoResultsText>
        )}
      </ResultsContainer>
      <Footer />
    </>
  );
};

export default ResultsComponent;