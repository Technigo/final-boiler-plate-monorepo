import { useEffect, useRef, useState, useCallback } from "react";
import { adStore } from "../stores/adStore";
import searchIcon from "../assets/search-icon.svg";
import "./SearchBar.css"

export const SearchBar = ({setFilteredAds}) => {
    // Access the 'ads', 'getAllAds' from the 'advertStore'.
  const { ads, getAllAds } = adStore();

  //Add search state
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef()
  
  // Fetch ads when the component mounts
  useEffect(() => {
    getAllAds();
  }, [getAllAds]); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    const current = inputRef.current
    
    const setTerm = (e) =>  {
      if(e.target.value === "") {
        setFilteredAds([])
      }
      setSearchTerm(e.target.value) 
    }
      if(current){
        current.addEventListener("search", setTerm )
      }
      return () => {
        if(current){
          current.removeEventListener("search", setTerm )
        }
      }
  }, [setSearchTerm, setFilteredAds])
  //Function to handle search logic, use filter() function to filter ads based on the title or product name
  const handleSearch = useCallback(
    () => {
    // Reset filteredAds when the search term is empty
    console.log(ads)
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
    },
    [searchTerm, setFilteredAds, ads],
  );
  


  // Render the component content.
  return (
    <div className="search-bar">
      <div className="search-input">
      <input
            type="search"
            value={searchTerm}
            placeholder="Search for something"
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={inputRef}
        />
        <img
            src={searchIcon}
            className="search-icon"
            alt="search-icon"
            onClick={handleSearch}
        />
      </div>

    </div>
  )
}
