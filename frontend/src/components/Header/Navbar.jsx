import { BurgerMenu } from "./BurgerMenu";
import { useNavStore } from "../../stores/NavStore";
import { useEffect } from "react";
import { userStore } from "../../stores/userStore";
import { Link } from "react-router-dom";
import { Button } from "../Buttons/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.nav`
  position: relative;
  display: flex;
  justify-content: flex-end;

  ul {
    display: none;
  }

  //Show menu when mobile menu is open
  ul.burger-menu-open {
    display: block;
    width: 150px;
  }

  @media (min-width: 800px) {
    ul {
      display: flex;
      gap: 30px;
    }
  }
`;

export const Navbar = () => {
  const {
    activePage,
    setActivePage,
    burgerMenuVisible,
    setBurgerMenuVisible,
    setBurgerMenuOpen,
  } = useNavStore();

  const { isLoggedIn } = userStore();

  useEffect(() => {
    // Logic to toggle burger menu visibility based on window width
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 800) {
        setBurgerMenuVisible(true);
      } else {
        setBurgerMenuVisible(false);
        setBurgerMenuOpen(false); // Close the burger menu on larger screens
      }
    };

    handleResize(); // Initialize on mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setBurgerMenuVisible, setBurgerMenuOpen]);

  // Initialize the 'navigate' function from React Router.
  const navigate = useNavigate();

  // Access the 'handleLogout' function from the 'userStore'.
  const storeHandleLogout = userStore((state) => state.handleLogout);

  // Function to handle the click event of the logout button.
  const onLogoutClick = () => {
    console.log("Logout button clicked"); // For debugging
    storeHandleLogout();
    // Additional logic after logout can be added here.
    alert("Log out successful");
    navigate("/"); // You can change this to the login route
  };

  return (
    <StyledNav>
      {burgerMenuVisible ? (
        <BurgerMenu />
      ) : (
        <ul>
          <li className={activePage === "home" ? "active" : ""}>
            <Link
              to="/"
              onClick={() => {
                setActivePage("home");
              }}
            >
              Home
            </Link>
          </li>
          <li className={activePage === "login" ? "active" : ""}>
            <Link
              to="/login"
              onClick={() => {
                setActivePage("login");
              }}
            >
              Login
            </Link>
          </li>
          <li className={activePage === "register" ? "active" : ""}>
            <Link
              to="/register"
              onClick={() => {
                setActivePage("register");
              }}
            >
              Register
            </Link>
          </li>
          <li className={activePage === "tasks" ? "active" : ""}>
            <Link
              to="/tasks"
              onClick={() => {
                setActivePage("tasks");
              }}
            >
              Task feed
            </Link>
          </li>
          <li className={activePage === "profile" ? "active" : ""}>
            <Link
              to="/profile"
              onClick={() => {
                setActivePage("profile");
              }}
            >
              Profile
            </Link>
          </li>
          <li className={activePage === "about" ? "active" : ""}>
            <Link
              to="/about"
              onClick={() => {
                setActivePage("about");
              }}
            >
              About
            </Link>
          </li>
          {/* Logout button based on user login status */}
          {isLoggedIn ? (
            <li>
              <Button
                className="logout-button"
                buttonName="Log out"
                onClick={onLogoutClick}
              />
            </li>
          ) : null}
        </ul>
      )}
    </StyledNav>
  );
};
