// Import necessary dependencies, components, and stores.
import { useState } from "react";
import "../pages/search.css";
import { userStore } from "../stores/userStore";
import { Footer } from "../components/Footer";
import { AdCard } from "../components/AdCard";
import { SearchBar } from "../components/SearchBar";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";


// Define the 'Search' functional component.
export const Search = () => {
  const navigate = useNavigate();
  const [filteredAds, setFilteredAds] = useState([]);
  const isLoggedin = userStore((state) => state.isLoggedin);
  const handleLogout = userStore((state) => state.handleLogout);

  useEffect(() => {
    if (!isLoggedin) {
      // If the user is not logged in, show an alert and navigate to the login route.
      Swal.fire({
        title: "Error!",
        text: "Please log in to see the content",
        icon: "error"
      });
      navigate("/login");
  }}, [isLoggedin, navigate]);

  
  return (
    <div>
       <Navbar menuItems={[{path: "/search", name: "Search"} ,{path: "/setting", name: "Profile Setting"}, {path: "/about", name: "About"} , {path: "/terms", name: "Terms"} , {name: "Logout", onClick: () => {
        handleLogout()
        navigate("/login")
        }}]} menuDesks={[{path: "/setting", name: "Profile Setting"},{path: "/terms", name: "Terms"} , {path: "/about", name: "About"} ,{name: "Logout", onClick: () => {
        handleLogout()
        navigate("/login")
        }}  ]}/>
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
