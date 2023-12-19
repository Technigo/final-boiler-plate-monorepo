// Import necessary dependencies and components.
import { useEffect } from "react";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BackArrow from "../components/BackArrow";

// Define the 'Home' functional component.
export const Home = () => {
  // Access the 'handleLogout' function from the 'userStore'.
  const storeHandleLogout = userStore((state) => state.handleLogout);

  // Use the 'useNavigate' hook to programmatically navigate between routes.
  const navigate = useNavigate();

  // Get 'isLoggedIn' and 'accessToken' from the 'userStore'.
  const isLoggedIn = userStore.getState((state) => state.isLoggedIn);

  // useEffect hook to check user authentication status.
  useEffect(() => {
    if (!isLoggedIn) {
      // If the user is not logged in, show an alert and navigate to the login route.
      alert("Please log in to see the content");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Function to handle the click event of the logout button.
  const onLogoutClick = () => {
    storeHandleLogout(); // Call the 'handleLogout' function from 'userStore'.
    // Additional logic after logout - navigate to login
    alert("Log out successful");
    navigate("/login");
  };

  // Render the component content.
  return (
    <>
      <nav>
        {/* Create a navigation menu with links to various routes. */}
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/home">Home</Link>
          </li>
          <li className="app-li">
            <Link to="/tasks">Tasks</Link>
          </li>
          <li className="app-li">
            {/* Create a button for logging out and attach the 'onLogoutClick' event handler. */}
            <button onClick={onLogoutClick}>Sign Out</button>
          </li>
        </ul>
      </nav>
      {/* Render the 'Logos' component. */}
      <BackArrow />
    </>
  );
};
