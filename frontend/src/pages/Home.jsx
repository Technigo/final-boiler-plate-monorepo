// Import necessary dependencies and components.
import { useEffect } from "react";
import { userStore } from "../stores/userStore";
import { useNavigate, Link } from "react-router-dom";
import BackArrow from "../components/BackArrow";
import { Footer } from "../components/Footer";
import { SearchBar } from "../components/SearchBar";
import { AdsList } from "../components/AdsList";
import { YourAds } from "../components/YourAds";
import { Navbar } from "../components/Navbar";

// Define the 'Home' functional component.
export const Home = () => {
  // Use the 'useNavigate' hook to programmatically navigate between routes.
  const navigate = useNavigate();

  // Get 'isLoggedIn' and 'accessToken' from the 'userStore'.
  const isLoggedin = userStore.getState((state) => state.isLoggedin);

  // useEffect hook to check user authentication status.
  useEffect(() => {
    if (!isLoggedin) {
      // If the user is not logged in, show an alert and navigate to the login route.
      alert("Please log in to see the content");
      navigate("/login");
    }
  }, [isLoggedin, navigate]);


  // Render the component content.
  return (
    <>
       <Navbar menuItems={[{path: "/search", name: "Search"} ,{path: "/profile", name: "Profile"},{path: "/setting", name: "Setting"}, {path: "/about", name: "About"} , {path: "/terms", name: "Terms"}]}/>
      <BackArrow />
      {/* Render the search bar */}
      <Link to="/search">
        <SearchBar />
      </Link>
      {/* Render the recently added ads */}
      <h1>Recently Added</h1>
      <AdsList />
      {/* Render the user's ads */}
      <YourAds />
      <Footer />
    </>
  );
};
