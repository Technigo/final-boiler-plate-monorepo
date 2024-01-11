import { useState, useEffect } from "react";
import { useCallback } from "react";
import PropTypes from "prop-types";
import likeIcon from "../../assets/likeicon.svg";
import { timeSince } from "../utils/timeUtils";
import "./StoryList.css";

export const StoryList = () => {
  // State declarations
  const [stories, setStories] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // default to English

  // API URL from environment variables or default
  const apiUrl = import.meta.env.VITE_BACKEND_API || "http://localhost:3000";

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Function to update cities and categories based on fetched stories
  const updateCitiesAndCategories = useCallback((storiesData) => {
    setCities([...new Set(storiesData.map((story) => story.city))]);
    setCategories([
      ...new Set(
        storiesData.map((story) => capitalizeFirstLetter(story.category))
      ),
    ]);
  }, []);

  // Function to handle like clicks
  const handleLikeClick = async (storyId) => {
    try {
      const response = await fetch(`${apiUrl}/stories/${storyId}/rank`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedStory = await response.json();
      // Update the stories state with the new ranking
      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === storyId ? updatedStory : story
        )
      );
    } catch (error) {
      console.error("Error updating story ranking:", error);
    }
  };

  useEffect(() => {
    // Function to fetch stories from backend
    const fetchStories = async () => {
      try {
        const response = await fetch(`${apiUrl}/stories`);
        const data = await response.json();
        setStories(data);
        updateCitiesAndCategories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, [apiUrl, updateCitiesAndCategories]);

  useEffect(() => {
    // Function to fetch translated stories
    const fetchTranslatedStories = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/stories?language=${selectedLanguage}`
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
      fetch(`${apiUrl}/stories`)
        .then((response) => response.json())
        .then((data) => {
          setStories(data);
          updateCitiesAndCategories(data);
        })
        .catch((error) => console.error("Error fetching stories:", error));
    }
  }, [apiUrl, selectedLanguage, updateCitiesAndCategories]);

  // Event handlers for select elements
  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setSelectedCity("");
    setSelectedCategory("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value.toLowerCase());
  };

  // Filter and sort stories based on selected filter criteria
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

  // Handler for language change
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
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="sv">Swedish</option>
          </select>

          <select
            className="dropdowns"
            value={filterType}
            onChange={handleFilterTypeChange}
          >
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
              onChange={handleCityChange}
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
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
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
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
              <div className="story-info">
                <h4>{capitalizeFirstLetter(story.category)}</h4>
                <h3>{story.city}</h3>
              </div>
            </div>
            <div className="story-content">
              <h3>{story.title}</h3>
              <p>{story.content}</p>
              <div className="story-footer">
                {timeSince(story.createdAt)}
                <img
                  className="like-icon"
                  src={likeIcon}
                  alt="Like"
                  onClick={() => handleLikeClick(story._id)}
                />
                <span className="like-count">{story.ranking}</span>
              </div>
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
