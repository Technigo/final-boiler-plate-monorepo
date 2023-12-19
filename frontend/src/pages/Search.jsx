// ADAPT THIS FILE FOR DISPLAYING FILTERED ADVERTS

// Import necessary dependencies, components, and stores.
import { useEffect } from "react";
import { adStore } from "../stores/adStore";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BackArrow from "../components/BackArrow";
import defalutImg from "../assets/image.png";

// Define the 'Tasks' functional component.
export const Search = () => {
  // Access the 'tasks', 'fetchTasks', 'handleEdit', and 'deleteTaskById' functions from the 'advertStore'.
  const { ads, getAllAds } = adStore();
  // Access the 'accessToken' from the 'userStore'.
  const { accessToken } = userStore();

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

  return (
    <div>
      <h1>Search</h1>
      <input className="search-bar" type="search" />
      <div>
        <button className="search-button">Search</button>
      </div>
      <ul className="">
        {ads.map((ad) => (
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
