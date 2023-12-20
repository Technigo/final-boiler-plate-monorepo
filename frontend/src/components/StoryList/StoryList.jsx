<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { StoryCardList } from '../StoryCardList/StoryCardList'; 

export const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('stories.json')
      .then(response => response.json())
      .then(data => {
        setStories(data.stories);
        // Extract unique cities
        const uniqueCities = Array.from(new Set(data.stories.map(story => story.city)));
        setCities(uniqueCities);
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.stories.map(story => story.category)));
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching stories:', error));
  }, []);

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setSelectedCity('');
    setSelectedCategory('');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredStories = stories.filter(story => {
    // Filter by city only if a specific city is selected
    if (filterType === 'city' && selectedCity) {
      return story.city === selectedCity;
    }
    // Filter by category only if a specific category is selected
    else if (filterType === 'category' && selectedCategory) {
      return story.category === selectedCategory;
    }
    // No specific filter selected, return all stories
    return true;
  }).sort((a, b) => {
    // Sort by ranking if that filter is selected
    if (filterType === 'ranking') {
      return b.ranking - a.ranking;
    }
    // No sorting applied
    return 0;
  });

  return (
    <div className="story-list">
    <div className="filter-options">
      <select value={filterType} onChange={handleFilterTypeChange}>
        <option value="">Select Filter</option>
        <option value="ranking">Ranking</option>
        <option value="city">City</option>
        <option value="category">Category</option>
        <option value="latest">Latest</option>
      </select>

      {filterType === 'city' && (
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      )}

      {filterType === 'category' && (
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      )}
    </div>
    {filteredStories.map(story => (
      <StoryCardList key={story.id} story={story} />
    ))}
  </div>
);
};


export default StoryList;
=======
// import { useState, useEffect } from "react";
// import { StoryCardList } from "../StoryCardList/StoryCardList";

// export const StoryList = () => {
//   const [stories, setStories] = useState([]);

//   useEffect(() => {
//     fetch("stories.json")
//       .then((response) => response.json())
//       .then((data) => setStories(data.stories))
//       .catch((error) => console.error("Error fetching stories:", error));
//   }, []);

//   return (
//     <div className="story-list">
//       {stories.map((story) => (
//         <StoryCardList key={story.id} story={story} />
//       ))}
//     </div>
//   );
// };

// export default StoryList;
>>>>>>> main
