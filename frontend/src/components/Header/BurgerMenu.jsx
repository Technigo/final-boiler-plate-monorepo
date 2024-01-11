import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
//import { BurgerMenuAnimation } from "./Animations/BurgerMenuAnimation.jsx";
import { useNavStore } from "../../stores/NavStore";
import { userStore } from "../../stores/userStore";
import { Button } from "../Buttons/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledBurgerMenu = styled.div`
  display: flex;
  max-width: 130px;
  padding: 0 0 20px 20px;
`;

const StyledToggleButton = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: transparent;
  border: none;
  font-size: 20px;
  padding: 0;
  color: var(--lighttext);
  cursor: pointer;
`;

const StyledBurgerLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .logout-button {
    margin: 0;
    padding: 0;
  }
`;

export const BurgerMenu = () => {
  const { activePage, setActivePage, burgerMenuOpen, setBurgerMenuOpen } =
    useNavStore();

  const closeBurgerMenu = () => {
    setBurgerMenuOpen(false);
  };

  // Initialize the 'navigate' function from React Router.
  const navigate = useNavigate();

  // Access the 'handleLogout' function from the 'userStore'.
  const storeHandleLogout = userStore((state) => state.handleLogout);

  const { isLoggedIn } = userStore();

  // Function to handle the click event of the logout button.
  const onLogoutClick = () => {
    storeHandleLogout();
    // Navigate to the home page after logout.
    navigate("/");
  };

  return (
    <StyledBurgerMenu>
      <StyledToggleButton onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}>
        {burgerMenuOpen ? (
          <IoCloseOutline
            style={{
              width: "25px",
              height: "25px",
              position: "absolute",
              top: "3px",
              right: "3px",
            }}
          />
        ) : (
          <RxHamburgerMenu style={{ width: "25px", height: "25px" }} />
        )}
      </StyledToggleButton>
      {/* <BurgerMenuAnimation onClick={toggleBurgerMenu} /> */}
      <StyledBurgerLinks>
        <ul className={burgerMenuOpen ? "burger-menu-open" : ""}>
          <li className={activePage === "home" ? "active" : ""}>
            <Link
              to="/"
              onClick={() => {
                setActivePage("home");
                closeBurgerMenu();
              }}
            >
              Home
            </Link>
          </li>
          {/* Conditionally render "Log in" and "Register" links */}
          {isLoggedIn ? null : (
            <>
              <li className={activePage === "login" ? "active" : ""}>
                <Link
                  to="/login"
                  onClick={() => {
                    setActivePage("login");
                    closeBurgerMenu();
                  }}
                >
                  Log in
                </Link>
              </li>
              <li className={activePage === "register" ? "active" : ""}>
                <Link
                  to="/register"
                  onClick={() => {
                    setActivePage("register");
                    closeBurgerMenu();
                  }}
                >
                  Register
                </Link>
              </li>
            </>
          )}
          {/* Conditionally render "Deed Hub" link only when logged in */}
          {isLoggedIn ? (
            <li className={activePage === "tasks" ? "active" : ""}>
              <Link
                to="/tasks"
                onClick={() => {
                  setActivePage("tasks");
                  closeBurgerMenu();
                }}
              >
                Deed Hub
              </Link>
            </li>
          ) : null}
          {/* Conditionally render "Profile" link only when logged in */}
          {isLoggedIn ? (
            <li className={activePage === "profile" ? "active" : ""}>
              <Link
                to="/profile"
                onClick={() => {
                  setActivePage("profile");
                  closeBurgerMenu();
                }}
              >
                Profile
              </Link>
            </li>
          ) : null}
          <li className={activePage === "about" ? "active" : ""}>
            <Link
              to="/about"
              onClick={() => {
                setActivePage("about");
                closeBurgerMenu();
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
      </StyledBurgerLinks>
    </StyledBurgerMenu>
  );
};
