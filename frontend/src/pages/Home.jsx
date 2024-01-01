// Import necessary dependencies and components.
//import { useEffect } from "react";
//import { userStore } from "../stores/userStore";
//import { useNavigate } from "react-router-dom";
// import { LinkButton } from "../components/Buttons/LinkButton";
// import { Link } from "react-router-dom";
import { Hero } from "../components/Hero";
import styled from "styled-components";
import { TestimonialsCarousel } from "../components/Testimonials/TestimonialsCarousel";

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  @media (min-width: 800px) {
    gap: 150px;
  }
`;

// const StyledButtonWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 20px;

//   @media (min-width: 600px) {
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     gap: 50px;
//   }

//   @media (min-width: 1050px) {
//     gap: 100px;
//   }
// `;

const StyledTestimonials = styled.div`
  display: flex;
  flex-direction: column;
`;

// Define the 'Home' functional component.
export const Home = () => {
  // Define text content for the heading and subheading.
  const text = {
    // heading: "Welcome",
    // subheading: "Our mission is to help people connect with their community",
    // intro:
    //   "Join a community of compassion and generosity, connecting hearts through simple acts of kindness. Together, we build a world where every effort makes a meaningful difference. Welcome to our movement of humanity.",
    testimonials: "Stories of kindness",
  };

  // Access the 'handleLogout' function from the 'userStore'.
  // const storeHandleLogout = userStore((state) => state.handleLogout);

  // // Use the 'useNavigate' hook to programmatically navigate between routes.
  // const navigate = useNavigate();

  // // Get 'isLoggedIn' and 'accessToken' from the 'userStore'.
  // const { isLoggedIn, accessToken } = userStore();
  // console.log(isLoggedIn);
  // console.log(accessToken);

  // // useEffect hook to check user authentication status.
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     // If the user is not logged in, show an alert and navigate to the login route.
  //     alert("no permission - here");
  //     navigate("/"); // You can change this to the login route
  //   }
  // }, [isLoggedIn]);

  // Function to handle the click event of the logout button.
  // const onLogoutClick = () => {
  //   storeHandleLogout(); // Call the 'handleLogout' function from 'userStore'.
  //   // Additional logic after logout can be added here.
  //   alert("Log out successful");
  //   navigate("/"); // You can change this to the login route
  // };

  // Render the component content.
  return (
    <StyledHomePage>
      {/* <h1 className="heading">{text.heading}</h1>
      <h2>{text.subheading}</h2>
      <p>{text.intro}</p> */}
      <Hero />
      {/* <StyledButtonWrapper>
        <LinkButton to="/login" className="login-button" buttonName="Log in" />
        <LinkButton
          to="/register"
          className="register-button"
          buttonName="Join the community"
        />
      </StyledButtonWrapper> */}
      <StyledTestimonials>
        <h3>{text.testimonials}</h3>
        <TestimonialsCarousel />
      </StyledTestimonials>
    </StyledHomePage>
  );
};
