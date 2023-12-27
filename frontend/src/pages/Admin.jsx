// Import necessary dependencies and components.
import React, { useEffect } from "react";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BookingListComponent } from "../components/BookingListComponent";
import { BtnComponent } from "../components/BtnComonent";
import { DropDownComponent } from "../components/DropDownComponent";
import { SubHeadingComponent } from "../components/SubHeadingComponent";
import useBookingStore from '../stores/bookingStore';
// Admin component to manage and display bookings.
// This component fetches and displays all bookings (handled and unhandled).
export const Admin = () => {
  // Access the 'handleLogout' function from the 'userStore'.
  const storeHandleLogout = userStore((state) => state.handleLogout);

  const handleDeleteAllBookings = useBookingStore((state) => state.handleDeleteAllBookings);


  const handleDeleteAllButtonClick = () => {
    const userConfirmed = window.confirm("Are you sure you want to delete all bookings?");

    if (userConfirmed) {
      // User clicked OK, proceed with the deletion
      handleDeleteAllBookings();
    } else {
      // User clicked Cancel, do nothing
    }
  };
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
      alert("No permission - please log in");
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

    <div className="bg-backgroundPink">
      <nav>
        {/* Create a navigation menu with links to various routes. */}
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/tasks">Tasks</Link>
          </li>
        </ul>
      </nav>

      {/* Logout button */}
      <div className="flex items-center justify-center p-4">
        <BtnComponent label="Logout" onClick={onLogoutClick} />
        <BtnComponent label="Delete all bookings" onClick={handleDeleteAllButtonClick} />
      </div>

      <div className="flex flex-col items-center justify-center p-4">
        <SubHeadingComponent text="All bookings" />
        <DropDownComponent />
      </div>

      {/* 
        Display the BookingListComponent to show all bookings.
        Set fetchAllBookings to true to fetch and display all bookings (handled and unhandled).
      */}
      <BookingListComponent fetchAllBookings={true} />
    </div>

  );
};
