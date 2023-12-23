import React from 'react';
import { useNavigate } from 'react-router-dom';

export const DropDownComponent = () => {
    const navigate = useNavigate();

    const handleChange = (event) => {
        navigate(event.target.value);
    };

    return (
        <div>
            <label htmlFor="booking-filter">Filter Bookings: </label>
            <select id="booking-filter" onChange={handleChange}>
                <option value="" disabled selected>
                    Select an option
                </option>
                <option value="/Admin">All Bookings</option>
                <option value="/HandledBooking">Handled Bookings</option>
                <option value="/UnHandledBooking">Unhandled Bookings</option>
            </select>
        </div>
    );
}





