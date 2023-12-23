// UnHandledBooking.jsx
import React from 'react';
import { DropDownComponent } from "../components/DropDownComponent";
import { BookingListComponent } from "../components/BookingListComponent";
import { SubHeadingComponent } from '../components/SubHeadingComponent';
import { BtnComponent } from '../components/BtnComonent';

export const UnHandledBooking = () => {
    const onLogoutClick = () => {
        // Handle logout logic here
        alert("Log out successful");
        // Navigate to the login page or perform other actions
    };

    return (
        <div className="bg-backgroundPink">

            <div className="flex items-center justify-center p-4">
                <BtnComponent label="Logout" onClick={onLogoutClick} />
            </div>

            <div className="flex flex-col items-center justify-center p-4">
                <SubHeadingComponent text="Unhandled Bookings" />
                <DropDownComponent />
            </div>
            <div>
                {/* Pass prop fetchUnHandledBookings as true to fetch only unhandled bookings */}
                <BookingListComponent fetchUnHandledBookings={true} />
            </div>
        </div>

    );
};

