import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import styled from 'styled-components';
import { Link } from "react-router-dom";


// Define any styled components here
const Heading = styled.h1`
  /* Your styles for heading */
`;

const Subheading = styled.h2`
  /* Your styles for subheading */
`;

const Intro = styled.p`
  /* Your styles for intro paragraph */
`;

// Define the 'Home' functional component.
const Home = () => {
  // Define text content for the heading and subheading.
  const text = {
    heading: "Welcome to the home of Foodie Moodie- insert logo here",
    subheading: "Find your perfect dining spot",
  };

  return (
    <>
      <Navbar />
      <main>
        <Heading>{text.heading}</Heading> {/* Iinsert logo here when we have it*/}
        <Subheading>{text.subheading}</Subheading>
        <Intro>
          Start your journey to finding your perfect spot <Link to="/occasion">here</Link>.
        </Intro>
      </main>
      <Footer />
    </>
  );
};
export default Home;

  /*// Access the 'handleLogout' function from the 'userStore'.
  const storeHandleLogout = userStore((state) => state.handleLogout);

  // Use the 'useNavigate' hook to programmatically navigate between routes.
  const navigate = useNavigate();

  // Get 'isLoggedIn' and 'accessToken' from the 'userStore'.
  const { isLoggedIn, accessToken } = userStore();
  console.log(isLoggedIn);
  console.log(accessToken);

  // useEffect hook to check user authentication status.
  useEffect(() => {
    if (!isLoggedIn) {
      // If the user is not logged in, show an alert and navigate to the login route.
      alert("no permission - here");
      navigate("/"); // You can change this to the login route
    }
  }, [isLoggedIn]);

  // Function to handle the click event of the logout button.
  const onLogoutClick = () => {
    storeHandleLogout(); // Call the 'handleLogout' function from 'userStore'.
    // Additional logic after logout can be added here.
    alert("Log out successful");
    navigate("/"); // You can change this to the login route
  };

  // Render the component content.
  return (
    <>
      <nav>
        { Create a navigation menu with links to various routes. }
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/home">Home</Link>
          </li>
          <li className="app-li">
            <Link to="/tasks">Tasks</Link>
          </li>
          <li className="app-li">
            {Create a button for logging out and attach the 'onLogoutClick' event handler. }
            <button onClick={onLogoutClick}>Sign Out</button>
          </li>
        </ul>
      </nav>
      {Render the 'Logos' component. }
      <Logos />
      { Display the heading and subheading. }
      <h1 className="heading">{text.heading}</h1>
      <h2>{text.subheading}</h2>
      { (Note: 'text.intro' is not defined in the code.) }
      { Display additional content (text.intro is missing). }
      <p>{text.intro}</p>
    </>*/
