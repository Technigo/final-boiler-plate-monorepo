import { DropDownComponent } from '../components/Common/DropDownComponent';
import { BookingListComponent } from "../components/Bookings/BookingListComponent";
import { SubHeadingComponent } from "../components/Reusables/SubHeadingComponent"
import { BtnComponent } from '../components/Reusables/BtnComonent';
import { userStore } from "../stores/userStore";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ReusableModal } from '../components/Reusables/ReusableModal';

export const HandledBooking = () => {

    const [aboutModalIsOpen, setAboutModalIsOpen] = useState(false);
    // Access the 'handleLogout' function from the 'userStore'.
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
            Welcome to the Accepted Bookings Overview Page! <br /><br />Here, you can review and manage all the surfing bookings that you have accepted.
            <br /><br />
            Delete Bookings: Need to remove an accepted booking?<br /> The 'Delete' button allows you to quickly and easily delete individual bookings or clear your entire accepted booking list.
            <br /><br />
            Feel free to navigate through the user-friendly interface, manage your accepted bookings, and gain insights into each surfing adventure.
        </>
    );

    return (
        <div className='h-auto'>

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

            <div className="flex flex-col items-center justify-center p-4">
                <SubHeadingComponent text="Accepted Bokings" />
                <DropDownComponent />
            </div>

            <div>
                <BookingListComponent fetchAllBookings={false} />
            </div>
        </div>
    );
};
