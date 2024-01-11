import { useEffect, useRef, useState, useCallback } from "react";
import { adStore } from "../stores/adStore";
import searchIcon from "../assets/search-icon.svg";
import "./SearchBar.css";

export const SearchBar = ({ setFilteredAds, searchTerm, setSearchTerm }) => {
  // Access the 'ads', 'getAllAds' from the 'advertStore'.
  const { ads, getAllAds } = adStore();
  const [searchError, setSearchError] = useState(false); // New state for search error
  const inputRef = useRef();

  // Fetch ads when the component mounts
  useEffect(() => {
    getAllAds();
  }, [getAllAds]); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    const current = inputRef.current;

    const setTerm = (e) => {
      if (e.target.value === "") {
        setFilteredAds([]);
      }
      setSearchTerm(e.target.value);
    };
    if (current) {
      current.addEventListener("search", setTerm);
    }
    return () => {
      if (current) {
        current.removeEventListener("search", setTerm);
      }
    };
  }, [setSearchTerm, setFilteredAds]);

  // Trigger form submission when Enter key is pressed
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  //Function to handle search logic, use filter() function to filter ads based on the title or product name
  const handleSearch = useCallback(() => {
    // Reset filteredAds when the search term is empty
    console.log(ads);
    if (searchTerm === "") {
      setFilteredAds([]);
      setSearchError(false);
    } else {
      const filteredAds = ads.filter(
        (ad) =>
          ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ad.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ad.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      //Display the filtered ads
      setFilteredAds(filteredAds);
      console.log(filteredAds);
      // Update search error state
      setSearchError(filteredAds.length === 0);

      return filteredAds;
    }
  }, [searchTerm, setFilteredAds, setSearchError, ads]);

  // Render the component content.
  return (
    <div className="search-bar">
      <div className="search-input">
        <input
          type="search"
          value={searchTerm}
          placeholder="Search for something"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleKeyPress}
          ref={inputRef}
        />
        <img
          src={searchIcon}
          className="search-icon"
          alt="search-icon"
          onClick={handleSearch}
        />
      </div>
      <div className="search-error">
        {searchError && (
          <p className="error-message">No matching results found.</p>
        )}
      </div>
    </div>
  );
};
