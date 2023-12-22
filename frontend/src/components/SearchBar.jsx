import { useEffect, useState } from "react";
import { adStore } from "../stores/adStore";
import searchIcon from "../assets/search-icon.svg";

export const SearchBar = () => {
    // Access the 'ads', 'getAllAds' from the 'advertStore'.
  const { ads, getAllAds } = adStore();

  //Add search state
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAds, setFilteredAds] = useState([]);
  
  // Fetch ads when the component mounts
  useEffect(() => {
    getAllAds();
  }, [getAllAds]); // Empty dependency array ensures the effect runs only once on mount

  //Function to handle search logic, use filter() function to filter ads based on the title or product name
  const handleSearch = () => {
    console.log(ads);
    // Reset filteredAds when the search term is empty
    if (searchTerm === "") {
      setFilteredAds([]);
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
      return filteredAds;
    }
  };

  // Render the component content.
  return (
    <div className="search-bar">
        <input
            type="search"
            value={searchTerm}
            placeholder="Search for something"
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
            src={searchIcon}
            className="search-icon"
            alt="search-icon"
            onClick={handleSearch}
        />
    </div>
  )
}
