import React, { useEffect } from "react";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { BookingListComponent } from "../components/BookingListComponent";
import { BtnComponent } from "../components/BtnComonent";
import { DropDownComponent } from "../components/DropDownComponent";
import { SubHeadingComponent } from "../components/SubHeadingComponent";
//import relevant store
import useBookingStore from '../stores/bookingStore';

export const Admin = () => {
  const { fetchBookings, handleDeleteAllBookings } = useBookingStore();

  const handleDeleteAllButtonClick = async () => {
    const userConfirmed = window.confirm("Are you sure you want to delete all bookings?");

    if (userConfirmed) {
      // User clicked OK, proceed with the deletion
      await handleDeleteAllBookings();
    } else {
      // User clicked Cancel, do nothing
    }
  };

  // Use the 'useNavigate' hook to programmatically navigate between routes.
  const navigate = useNavigate();

  // Get 'isLoggedIn' and 'accessToken' from the 'userStore'.
  const { isLoggedIn } = userStore();

  // useEffect hook to check user authentication status and fetch all bookings.
  useEffect(() => {
    // Check authentication status
    if (!isLoggedIn) {
      // If the user is not logged in, show an alert and navigate to the login route.
      alert("No permission - please log in");
      navigate("/");
    }

    // Fetch all bookings
    fetchBookings();
  }, [isLoggedIn, navigate, fetchBookings]);

  // Access the 'handleLogout' function from the 'userStore'.
  const storeHandleLogout = userStore((state) => state.handleLogout);

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
      {/* Logout button */}
      <div className="flex items-center justify-center p-4">
        <BtnComponent className="m-2" label="Logout" onClick={onLogoutClick} />
        <BtnComponent className="m-2" label="Delete all bookings" onClick={handleDeleteAllButtonClick} />
      </div>

      <div className="flex flex-col items-center justify-center p-4">
        <SubHeadingComponent text="All bookings" />
        <DropDownComponent />
      </div>

      {/* Display the BookingListComponent to show all bookings. Set fetchAllBookings to true. */}
      <BookingListComponent fetchAllBookings={true} />
    </div>

  );
};
