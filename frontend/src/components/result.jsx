import Navbar from "./navbar"; // Ensure the path is correct
import Footer from "./footer"; // Ensure the path is correct
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRestaurantStore } from "../stores/restaurantStore";

const tablet = `(min-width: 640px)`;
const desktop = `(min-width: 1007px)`;

const ResultsContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: white;
`;

const NoResultsText = styled.p`
  color: #01999a;
  font-family: "JosefinSans";
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;

  @media ${tablet} {
    color: #01999a;
    font-family: "JosefinSans";
    text-align: center;
    margin-bottom: 20px;
    font-size: 35px;
  }
  @media ${desktop} {
    color: #01999a;
    font-family: "JosefinSans";
    text-align: center;
    margin-bottom: 20px;
    font-size: 35px;
  }
`;

const ResultCard = styled.div`
  margin-bottom: 20px;
  margin-top: 5px;
  padding: 15px;
  border: 1px solid #01999a;
  border-radius: 10px;
  background-color: #01999a;
  color: white;
  width: 80vw;
  align-items: center;

  @media ${tablet} {
    margin-bottom: 20px;
    margin-top: 15px;
    /* margin: 15vh 15vh; */
    padding: 15px;
    border: 1px solid #01999a;
    border-radius: 10px;
    background-color: #01999a;
    color: white;
    width: 90vw;
    align-items: center;
  }

  @media ${desktop} {
    margin-bottom: 20px;
    margin-top: 15px;
    padding: 15px;
    border: 1px solid #01999a;
    border-radius: 10px;
    background-color: #01999a;
    color: white;
    width: 92vw;
    align-items: center;
  }
`;

const StyledHeading = styled.h2`
  font-size: 25px;
  font-family: Arial, sans-serif;
  color: white;
  font-family: "JosefinSans";

  @media ${tablet} {
    font-size: 35px;
    font-family: Arial, sans-serif;
    color: white;
    font-family: "JosefinSans";
  }

  @media ${desktop} {
    font-size: 35px;
    font-family: Arial, sans-serif;
    color: white;
    font-family: "JosefinSans";
  }
`;

const StyledParagraph = styled.p`
  font-size: 16px;
  color: white;
  font-family: "JosefinSans";

  @media ${tablet} {
    font-size: 20px;
    color: white;
    font-family: "JosefinSans";
  }
  @media ${desktop} {
    font-size: 20px;
    color: white;
    font-family: "JosefinSans";
  }
`;

const BackButton = styled.button`
  background-color: white;
  color: #01999a;
  padding: 6px 8px;
  border: solid #01999a;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-family: "JosefinSans";
  /* margin: 2px 2px; */
  transition-duration: 0.2s;

  &:hover {
    color: #fcabe3;
  }

  &:active {
    transform: translateY(1px);
  }

  @media ${tablet} {
    background-color: white;
    color: #01999a;
    padding: 6px 8px;
    border: solid #01999a;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-family: "JosefinSans";
    /* margin: 2px 2px; */
    transition-duration: 0.2s;

    &:hover {
      color: #fcabe3;
    }

    &:active {
      transform: translateY(1px);
    }
  }

  @media ${desktop} {
    background-color: white;
    color: #01999a;
    padding: 6px 8px;
    border: solid #01999a;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-family: "JosefinSans";
    /* margin: 2px 2px; */
    transition-duration: 0.2s;

    &:hover {
      color: #fcabe3;
    }

    &:active {
      transform: translateY(1px);
    }
  }
`;

const StyledButtonLink = styled(Link)`
  background-color: #fcabe3;
  color: white;
  padding: 6px 6px;
  border: solid white 2px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;

  &:hover {
    color: #01999a;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const StyledAnchorLink = styled.a`
  background-color: #fcabe3;
  color: white;
  padding: 6px 6px;
  border: solid white 2px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;

  &:hover {
    color: #01999a;
  }

  &:active {
    transform: translateY(1px);
  }
`;
//Ej aktiv?
// const FlexRow = styled.div`
//   display: flex;
//   align-items: center;
// `;

const MoreLink = styled.a`
  color: yellow;
  cursor: pointer;
`;

const AgreeButton = styled.button`
  background-color: white;
  color: #01999a;
  padding: 5px 10px; /* Adjust padding as needed */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px; /* Add margin to separate from count */
  transition-duration: 0.4s;

  &:hover {
    background-color: yellow;
    color: #01999a;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const StyleSelectCurtain = styled.select`
  padding: 5px;
  font-size: 12px;
  border: 1px solid #01999a;
  background-color: #01999a;
  color: white;
  border-radius: 10px;
  margin-top: 5px;
  font-family: "JosefinSans";
`;

//Ej aktiv?
// const AgreeCount = styled.span`
//   font-size: 14px;
//   color: #800f2f;
// `;

const TruncatedText = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };

  const resultString = isTruncated
    ? `${text.substring(0, maxLength)}...`
    : text;

  return (
    <>
      {resultString}
      {text.length > maxLength && (
        <MoreLink onClick={toggleTruncation}>
          {isTruncated ? " Read more" : " Read less"}
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
  const { results, fetchResults, selectedOccasion, selectedMoods } =
    useRestaurantStore();
  const [sortType, setSortType] = useState("restaurantName");
  const [agreeCounts, setAgreeCounts] = useState(() => {
    return JSON.parse(localStorage.getItem("agreeCounts")) || {};
  });

  useEffect(() => {
    if (selectedOccasion && selectedMoods.length > 0) {
      fetchResults();
    }
  }, [selectedOccasion, selectedMoods, fetchResults]);

  useEffect(() => {
    localStorage.setItem("agreeCounts", JSON.stringify(agreeCounts));
  }, [agreeCounts]);

  const getSortedResults = () => {
    let sorted = [];
    switch (sortType) {
      case "restaurantName":
        sorted = [...results].sort((a, b) =>
          a.restaurantName.localeCompare(b.restaurantName)
        );
        break;
      case "borough":
        sorted = [...results].sort((a, b) =>
          a.borough.localeCompare(b.borough)
        );
        break;
      case "cuisine":
        sorted = [...results].sort((a, b) =>
          a.cuisine.localeCompare(b.cuisine)
        );
        break;
      default:
        sorted = results;
        break;
    }
    return sorted.map((restaurant) => ({
      ...restaurant,
      mapsUrl: generateGoogleMapsUrl(
        restaurant.address,
        restaurant.city,
        restaurant.country
      ),
    }));
  };

  const handleAgreeClick = (restaurantId) => {
    setAgreeCounts((prevCounts) => {
      const newCounts = {
        ...prevCounts,
        [restaurantId]: (prevCounts[restaurantId] || 0) + 1,
      };
      return newCounts;
    });
  };

  const sortedResults = getSortedResults();

  return (
    <>
      <Navbar />

      <ResultsContainer>
        <Link to="/mood">
          <BackButton>Go back to choose moods</BackButton>
        </Link>
        <br></br>
        <StyleSelectCurtain
          onChange={(e) => setSortType(e.target.value)}
          value={sortType}
        >
          <option value="restaurantName">Sort results by name</option>
          <option value="borough">Sort results by borough</option>
          <option value="cuisine">Sort results by cuisine</option>
        </StyleSelectCurtain>
        {sortedResults.length > 0 ? (
          sortedResults.map((restaurant) => (
            <ResultCard key={restaurant._id}>
              <StyledHeading>{restaurant.restaurantName}</StyledHeading>
              <StyledParagraph>Borough: {restaurant.borough}</StyledParagraph>
              <StyledParagraph>Cuisine: {restaurant.cuisine}</StyledParagraph>
              <StyledParagraph>
                <TruncatedText
                  text={`Occasion: ${restaurant.occasion.join(", ")}`}
                  maxLength={100}
                />
              </StyledParagraph>
              <StyledParagraph>
                Mood: {restaurant.mood.join(", ")}
              </StyledParagraph>
              <StyledParagraph>
                <TruncatedText
                  text={`Description: ${restaurant.description}`}
                  maxLength={100}
                />
              </StyledParagraph>
              <StyledParagraph>
                Address:{" "}
                <a
                  href={restaurant.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${restaurant.address}, ${restaurant.zipcode} ${restaurant.city}`}
                </a>
              </StyledParagraph>
              <StyledAnchorLink
  href={restaurant.url}
  target="_blank"
  rel="noopener noreferrer"
>
  Website
</StyledAnchorLink>
              <br />
              <StyledButtonLink to="/suggestion">
                Want to add to the description? Click here!
              </StyledButtonLink>
              <StyledParagraph>
                <AgreeButton onClick={() => handleAgreeClick(restaurant._id)}>
                  {agreeCounts[restaurant._id] || 0} 👍
                </AgreeButton>
              </StyledParagraph>
            </ResultCard>
          ))
        ) : (
          <NoResultsText>
            We are sad to say we cannot find anything that fits your needs.
            Please try again!
          </NoResultsText>
        )}
      </ResultsContainer>
      <Footer />
    </>
  );
};

export default ResultsComponent;
