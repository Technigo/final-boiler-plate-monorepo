// Import necessary dependencies and components.
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userStore } from "../stores/userStore";
import { Footer } from "../components/Footer";
import { SearchBar } from "../components/SearchBar";
import { AdsList } from "../components/AdsList";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/reusableComponents/Button";
import Swal from "sweetalert2";
import "../pages/home.css";

// Define the 'Home' functional component.
export const Home = () => {
  // Use the 'useNavigate' hook to programmatically navigate between routes.
  const navigate = useNavigate();

  // Get 'isLoggedIn' and 'accessToken' from the 'userStore'.
  // const isLoggedin = userStore.getState().isLoggedin;
  const accessToken = userStore.getState().accessToken;
  const handleLogout = userStore((state) => state.handleLogout);
  console.log(accessToken);
  // useEffect hook to check user authentication status.
  useEffect(() => {
    if (accessToken) {
      navigate("/home");
    } else {
      // If the user is not logged in, show an alert and navigate to the login route.
      Swal.fire({
        title: "Error!",
        text: "Please log in to see the content",
        icon: "error",
      });
      navigate("/login");
    }
  }, [accessToken, navigate]);

  // Render the component content.
  return (
    <>
      <Navbar
        menuItems={[
          { path: "/home", name: "Home" },
          { path: "/search", name: "Search" },
          { path: "/settings", name: "My Settings" },
          { path: "/manage-your-ads", name: "My Products" },
          { path: "/about", name: "About" },
          { path: "/terms", name: "Terms" },
          {
            name: "Logout",
            onClick: () => {
              handleLogout();
              navigate("/login");
            },
          },
        ]}
        menuDesks={[
          { path: "/search", name: "Search" },
          { path: "/settings", name: "My Settings" },
          { path: "/manage-your-ads", name: "My Products" },
          {
            name: "Logout",
            onClick: () => {
              handleLogout();
              navigate("/login");
            },
          },
        ]}
        isHomePage={true}
      />
      <div className="main-container">
        <div className="main-wrapper">
          <Link className="searchbar-link" to="/search">
            <SearchBar />
          </Link>
          <h1>Recently added</h1>
          {accessToken && (
            <AdsList
              fetchType="all"
              displayGrid="true"
              initialDisplayCount={4}
              maxDisplayCount={20}
            />
          )}
          {/* Render the user's ads */}
          <h1>Your ads</h1>
          {accessToken && <AdsList fetchType="user" />}
          <div className="add-product">
            <Link to="/create-ad">+ Add a product</Link>
          </div>
          <Button label="Manage your ads" link="/manage-your-ads" />
        </div>
      </div>
      <Footer />
    </>
  );
};
