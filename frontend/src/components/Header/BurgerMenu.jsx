import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
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
  z-index: 2;
`;

const StyledBurgerLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1; /* Ensure that the burger menu links are behind the toggle button. */

  .logout-button {
    margin: 0;
    padding: 0;
  }

  // When the burger menu is open on small screens, it gets a background color for readability.
  @media screen and (max-width: 510px) {
    background-color: ${(props) =>
      props.burgerMenuOpen ? "rgba(155, 100, 137, 0.8)" : "transparent"};
    padding: ${(props) => (props.burgerMenuOpen ? "0 0 5px 5px" : "0")};
    border-radius: ${(props) => (props.burgerMenuOpen ? "10px 0 10px 0" : "0")};
  }
`;

export const BurgerMenu = () => {
  const { activePage, setActivePage, burgerMenuOpen, setBurgerMenuOpen } =
    useNavStore();

  // Function to close the burger menu.
  const closeBurgerMenu = () => {
    setBurgerMenuOpen(false);
  };

  // Initialize the 'navigate' function from React Router.
  const navigate = useNavigate();

  // Access the 'handleLogout' function from the 'userStore'.
  const storeHandleLogout = userStore((state) => state.handleLogout);

  // Access the 'isLoggedIn' variable from the 'userStore'.
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
              right: "-10px",
            }}
          />
        ) : (
          <RxHamburgerMenu style={{ width: "25px", height: "25px" }} />
        )}
      </StyledToggleButton>

      {/* Conditionally render the burger menu links based on the user login status and the active page. */}
      <StyledBurgerLinks burgerMenuOpen={burgerMenuOpen}>
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
                className="logout-button-burgermenu"
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
