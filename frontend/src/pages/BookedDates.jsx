import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { SortedByDate } from "../components/Bookings/SortedByDate"
import { SubHeadingComponent } from "../components/Reusables/SubHeadingComponent"
import { DropDownComponent } from "../components/Common/DropDownComponent"
import { ReusableModal } from '../components/Reusables/ReusableModal';
import { BtnComponent } from '../components/Reusables/BtnComonent';
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";


export const BookedDates = () => {
    const [aboutModalIsOpen, setAboutModalIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null); // Added state for selected date

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

    const openAboutModal = () => {
        setAboutModalIsOpen(true);
    };

    const closeAboutModal = () => {
        setAboutModalIsOpen(false);
    };

    const aboutThisPageText = (
        <>
            Welcome to the Booking Overview Page!<br />
            This page provides an organized view of accepted surfing bookings sorted by date.<br />
            The colorful sections represent different dates, each displaying the total number of bookings for that day.<br />
            - Color Codes:<br />
            - Green: 1-5 bookings<br />
            - Orange: 6-9 bookings<br />
            - Red: 10 or more bookings<br />
            Click on the "Open booking" button to explore detailed information about bookings on a specific date.<br />
            The modal window will reveal comprehensive details about each booking, including the surfer's name, age, weight, height, and more.<br />
            Feel free to navigate, explore, and manage bookings effortlessly with this intuitive interface!<br /><br />
            Note: The first date shown is the closest date to today.
        </>
    );

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


            <div className="flex items-center justify-center p-4">
                <BtnComponent className="m-6 bg-gray-800 hover:bg-gray-600 text-white" label="Logout" onClick={onLogoutClick} />
            </div>

            <SubHeadingComponent text="Booking sorted by date" />

            <div className="flex justify-center items-center">
                <DropDownComponent />
            </div>

            <SortedByDate />
        </div>
    )
};
