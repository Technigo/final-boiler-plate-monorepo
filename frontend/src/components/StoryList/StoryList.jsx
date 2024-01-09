import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import likeIcon from "/likeblack.svg";
import { timeSince } from "../utils/timeUtils";
import "./StoryList.css";

export const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // default to English

  const backendApiUrl = "https://whisperwall.onrender.com/";

  // Function to update cities and categories based on fetched stories
  const updateCitiesAndCategories = (storiesData) => {
    setCities([...new Set(storiesData.map((story) => story.city))]);
    setCategories([...new Set(storiesData.map((story) => story.category))]);
  };

  useEffect(() => {
    // Function to fetch stories from backend
    const fetchStories = async () => {
      try {
        const response = await fetch(`${backendApiUrl}/stories`);
        const data = await response.json();
        setStories(data);
        updateCitiesAndCategories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);

  // useEffect(() => {
  //   // Function to fetch stories from backend
  //   const fetchStories = async () => {
  //     try {
  //       const response = await fetch(`${backendApiUrl}/stories`);
  //       const data = await response.json();
  //       setStories(data);
  //       setCities([...new Set(data.map((story) => story.city))]);
  //       setCategories([...new Set(data.map((story) => story.category))]);
  //     } catch (error) {
  //       console.error("Error fetching stories:", error);
  //     }
  //   };
  //   fetchStories();
  // }, []);

  useEffect(() => {
    // Function to fetch translated stories
    const fetchTranslatedStories = async () => {
      try {
        const response = await fetch(
          `${backendApiUrl}/stories?language=${selectedLanguage}`
        );
        const translatedData = await response.json();
        setStories(translatedData);
        updateCitiesAndCategories(translatedData);
      } catch (error) {
        console.error("Error fetching translated stories:", error);
      }
    };

    if (selectedLanguage !== "en") {
      fetchTranslatedStories();
    } else {
      // Fetch original stories when language is set to English
      fetch(`${backendApiUrl}/stories`)
        .then((response) => response.json())
        .then((data) => {
          setStories(data);
          updateCitiesAndCategories(data);
        })
        .catch((error) => console.error("Error fetching stories:", error));
    }
  }, [selectedLanguage]);

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setSelectedCity("");
    setSelectedCategory("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredStories = stories
    .filter((story) => {
      if (filterType === "city" && selectedCity) {
        return story.city === selectedCity;
      } else if (filterType === "category" && selectedCategory) {
        return story.category === selectedCategory;
      }
      return true;
    })
    .sort((a, b) => (filterType === "ranking" ? b.ranking - a.ranking : 0));

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="list-wrapper">
      <div className="story-list">
        <div className="filter-options">
          <select
            className="dropdowns"
            value={selectedLanguage}
            onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="sv">Swedish</option>
          </select>

          <select
            className="dropdowns"
            value={filterType}
            onChange={handleFilterTypeChange}>
            <option value="">Select Filter</option>
            <option value="ranking">Ranking</option>
            <option value="city">City</option>
            <option value="category">Category</option>
            <option value="latest">Latest</option>
          </select>

          {filterType === "city" && (
            <select
              className="dropdowns"
              value={selectedCity}
              onChange={handleCityChange}>
              <option value="">Select City</option>
              {cities.map((city, index) => (
                // Use a combination of city name and index as key
                <option key={`city-${index}-${city}`} value={city}>
                  {city}
                </option>
              ))}
            </select>
          )}

          {filterType === "category" && (
            <select
              className="dropdowns"
              value={selectedCategory}
              onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                // Use a combination of category name and index as key
                <option key={`category-${index}-${category}`} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
        </div>
        {filteredStories.map((story) => (
          <div key={story._id} className="story-card-list">
            <div className="story-cards">
              <div className="story-image">
                <img src={`/${story.image}`} alt={`${story.city} story`} />
              </div>
              <div className="story-footer">
                {timeSince(story.createdAt)}
                <img className="like-icon" src={likeIcon} alt="Like" />
                <span className="like-count">{story.ranking}</span>
              </div>
            </div>
            <div className="story-content">
              <div className="story-info">
                <h3>
                  {story.category} - {story.city}
                </h3>
              </div>
              <p>{story.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

StoryList.propTypes = {
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      ranking: PropTypes.number.isRequired,
    })
  ),
};

export default StoryList;
