import React from 'react';
import { DropDownComponent } from '../components/DropDownComponent';
import { BookingListComponent } from "../components/BookingListComponent";
import { SubHeadingComponent } from "../components/SubHeadingComponent"
import { BtnComponent } from '../components/BtnComonent';
import { userStore } from "../stores/userStore";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const HandledBooking = () => {

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

    return (
        <div className="bg-backgroundPink">
            <div className="flex items-center justify-center p-4">
                <BtnComponent label="Logout" onClick={onLogoutClick} />
            </div>

            <div className="flex flex-col items-center justify-center p-4">
                <SubHeadingComponent text="Handled Bokings" />
                <DropDownComponent />
            </div>

            <div>
                <BookingListComponent fetchAllBookings={false} />
            </div>
        </div>
    );
};
