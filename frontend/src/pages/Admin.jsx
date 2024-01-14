import { useState, useEffect } from "react";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { BookingListComponent } from "../components/Bookings/BookingListComponent";
import { BtnComponent } from "../components/Reusables/BtnComonent";
import { DropDownComponent } from "../components/Common/DropDownComponent";
import { SubHeadingComponent } from "../components/Reusables/SubHeadingComponent";
import { ReusableModal } from '../components/Reusables/ReusableModal';
//import relevant store
import useBookingStore from '../stores/bookingStore';

export const Admin = () => {
  const { fetchBookings, handleDeleteAllBookings } = useBookingStore();
  const [aboutModalIsOpen, setAboutModalIsOpen] = useState(false);

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

  const openAboutModal = () => {
    setAboutModalIsOpen(true);
  };

  const closeAboutModal = () => {
    setAboutModalIsOpen(false);
  };

  const aboutThisPageText = (
    <>
      Welcome to the Booking Overview Page! <br /><br />Here, you have the power to manage surfing bookings effortlessly. Explore a detailed view of both individual and group bookings, organized by request date. The latest request is the first one you see.<br />
      View Details: Click on the 'Show Bookings' button to reveal comprehensive details about each booking, including the surfer's name, age, weight, height, and more.
      <br />
      Accept Bookings: With the 'Accept booking' button, you can efficiently mark a booking as accepted, streamlining your booking management process.
      <br />
      Delete Bookings: Need to remove a booking? The 'Delete' button allows you to quickly and easily delete individual bookings or clear your entire booking list.
      <br />
      Feel free to navigate through the user-friendly interface, manage bookings, and gain insights into each surfing adventure. If you have any questions or need additional information, the 'About this page' button provides further details. Enjoy seamless booking management on this intuitive platform!
    </>
  );

  // Render the component content.
  return (

    <div>
      <BtnComponent className="mx-6 bg-gray-800 m-1 hover:bg-gray-600 text-white" onClick={() => openAboutModal()} label="About this page" />

      <ReusableModal
        isOpen={aboutModalIsOpen}
        onRequestClose={closeAboutModal}
        contentLabel="About This Page Modal"
        modalTitle="About This Page">
        {aboutThisPageText}
      </ReusableModal>

      {/* Logout button */}
      <div className="flex items-center justify-center p-4">
        <BtnComponent className="m-6 bg-gray-800 hover:bg-gray-600 text-white" label="Logout" onClick={onLogoutClick} />
        <BtnComponent className="m-6 bg-red-800 hover:bg-gray-600 text-white" label="Delete all bookings" onClick={handleDeleteAllButtonClick} />
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
