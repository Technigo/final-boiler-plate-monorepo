// Import necessary dependencies and components.
import { useEffect } from "react";
import { userStore } from "../stores/userStore";
import { useNavigate, Link } from "react-router-dom";
import BackArrow from "../components/BackArrow";
import { SearchBar } from "../components/SearchBar";
import { AdsList } from "../components/AdsList";
import { YourAds } from "../components/YourAds";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

// Define the 'Home' functional component.
export const Home = () => {
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

  // Render the component content.
  return (
    <>
      <Navbar />
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
