// Import necessary dependencies, components, and stores.
import { useState } from "react";
import "../pages/search.css";

import { Footer } from "../components/Footer";
import { AdCard } from "../components/AdCard";
import { SearchBar } from "../components/SearchBar";
import { Navbar } from "../components/Navbar";


// Define the 'Search' functional component.
export const Search = () => {
  const [filteredAds, setFilteredAds] = useState([]);

  return (
    <div>
       <Navbar menuItems={[{path: "/search", name: "Search"} ,{path: "/profile", name: "Profile"},{path: "/setting", name: "Setting"}, {path: "/about", name: "About"} , {path: "/terms", name: "Terms"}]} menuDesks={[{path: "/profile", name: "Profile"} ,{path: "/setting", name: "Setting"} , {path: "/about", name: "About"} ]}/>
      <SearchBar />
      <h1 className="search-result">Search result</h1>
      <ul className="filtered-ads">
        {filteredAds.map((ad) => (
          <AdCard key={ad._id} ad={ad} />
        ))}
      </ul>
      <Footer />
    </div>
    
  );
};
