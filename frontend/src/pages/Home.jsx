// Import necessary dependencies and components.
//import { useEffect } from "react";
//import { userStore } from "../stores/userStore";
//import { useNavigate } from "react-router-dom";
import Logos from "../components/Logos";
//import { Link } from "react-router-dom";
//import { Navbar } from "../components/Navbar";

// Define the 'Home' functional component.
export const Home = () => {
  // Define text content for the heading and subheading.
  const text = {
    heading: "Join the community",
    subheading: "Our mission is to help people connect with their communities",
    intro:
      "Welcome to our community of compassion and generosity. We believe in the power of uniting hearts and strive to create a world where every act of kindness matters. Our platform is a vibrant hub where those in need of help encounter those who are ready to offer their time and care without expecting anything in return. Here, it's about uplifting each other, where a simple gesture can make a tremendous difference. Perhaps there's an elderly neighbor who needs help raking leaves, someone requiring assistance with grocery shopping, or an individual unable to walk their four-legged friend. Our platform serves as a bridge connecting needs with helpful souls. We believe in fostering an inclusive community where goodwill and kindness are the currency. Here, commitment and generosity matter most. With us, every effort is a step towards a warmer, more empathetic world. Together, we're building a place where hearts meet to make a difference. Welcome to being a part of this beautiful movement of humanity.",
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
    <>
      <Logos />
      <p>{text.intro}</p>
    </>
    // <>
    //   <nav>
    //     {/* Create a navigation menu with links to various routes. */}
    //     <ul className="app-ul">
    //       <li className="app-li">
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li className="app-li">
    //         <Link to="/tasks">Tasks</Link>
    //       </li>
    //       <Link to="/login">Login</Link>
    //       <li className="app-li">
    //         {/* Create a button for logging out and attach the 'onLogoutClick' event handler. */}
    //         {/* <button onClick={onLogoutClick}>Sign Out</button> */}
    //       </li>
    //     </ul>
    //   </nav>
    //   {/* Render the 'Logos' component. */}
    //   <Logos />
    //   {/* Display the heading and subheading. */}
    //   <h1 className="heading">{text.heading}</h1>
    //   <h2>{text.subheading}</h2>
    //   {/* (Note: 'text.intro' is not defined in the code.) */}
    //   {/* Display additional content (text.intro is missing). */}
    //   <p>{text.intro}</p>
    // </>
  );
};
