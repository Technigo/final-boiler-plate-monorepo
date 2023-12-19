// ADAPT THIS FILE FOR DISPLAYING FILTERED ADVERTS

// Import necessary dependencies, components, and stores.
import { useEffect, useState } from "react";
import { adStore } from "../stores/adStore";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BackArrow from "../components/BackArrow";
import defalutImg from "../assets/image.png";

// Define the 'Search' functional component.
export const Search = () => {
  // Access the 'ads', 'getAllAds' from the 'advertStore'.
  const { ads, getAllAds } = adStore();
  // Access the 'accessToken' from the 'userStore'.
  const { accessToken } = userStore();
  //Add search state
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAds, setFilteredAds] = useState([]);

  // Use the 'useEffect' hook to fetch tasks when 'tasks' or 'accessToken' change.
  useEffect(() => {
    getAllAds();
  }, [getAllAds]);

  // Initialize the 'navigate' function from React Router.
  const navigate = useNavigate();
  // Access the 'handleLogout' function from the 'userStore'.
  const storeHandleLogout = userStore((state) => state.handleLogout);

  // Function to handle the click event of the logout button.
  const onLogoutClick = () => {
    storeHandleLogout();
    // Additional logic after logout can be added here.
    alert("Log out successful");
    navigate("/"); // You can change this to the login route
  };

  //Function to handle search logic, use filter() function to filter ads based on the title or product name
  const handleSearch = () => {
    const filteredAds = ads.filter(
      (ad) =>
        ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    //Display the filtered ads
    setFilteredAds(filteredAds);
  };

  return (
    <div>
      <h1>Search</h1>
      <input
        className="search-bar"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <ul className="">
        {filteredAds.map((ad) => (
          <li key={ad._id}>
            <img src={defalutImg} className="default-img" alt="Img" />
            <p>{ad.address}</p>
            <p>{ad.product}</p>
            <p>{ad.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
