// BookingListComponent.jsx
import React, { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { BtnComponent } from "./BtnComonent";
import { ParagraphComponent } from "./ParagraphComponent";
import { format, isValid } from 'date-fns';
import useBookingStore from '../stores/bookingStore';

export const BookingListComponent = () => {
    const { bookings, bookingIsHandledClick, handleDeleteBooking, fetchBookings } = useBookingStore();

    const formatTimeDifference = (timestamp) => {
        const currentTime = new Date();
        const bookingTime = new Date(timestamp);
        return formatDistanceToNow(bookingTime, { addSuffix: true });
    };
    const showDeleteConfirmation = (bookingId) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this booking?");
        if (userConfirmed) {
            // User clicked OK, proceed with the deletion
            handleDeleteBooking(bookingId);
        } else {
            // User clicked Cancel, do nothing
            // You can handle additional logic or UI changes here if needed
        }
    };

    useEffect(() => {
        // Call the fetchBookings function from your store
        fetchBookings();
    }, [fetchBookings]);


    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

                {/* Displaying bookings */}
                {bookings.map((booking, index) => (
                    <div key={index} className="flex justify-center items-center h-auto">
                        <div className="bg-customPink p-4">

                            {/* Booking details */}
                            <div>
                                <ParagraphComponent text={`${booking.name}, ${booking.age} years old`} category="Name" />

                                <ParagraphComponent text={`${booking.weight || "N/A"}`} category="Weight" />
                                <ParagraphComponent text={`${booking.height || "N/A"}`} category="Height" />

                                <ParagraphComponent text={`${booking.film ? "Yes" : "No"}`} category="Film" />
                                <ParagraphComponent text={`${booking.droneVideos ? "Yes" : "No"}`} category="Drone Videos" />
                                <ParagraphComponent text={`${booking.photo ? "Yes" : "No"}`} category="Photo" />

                                <ParagraphComponent text={`${booking.email}`} category="Email" />
                                <ParagraphComponent text={`${booking.phonenumber}`} category="Phone number" />

                                <ParagraphComponent text={`Other message: ${booking.message}`} />

                                <ParagraphComponent
                                    text={`Selected Date: ${isValid(new Date(booking.date)) ? format(new Date(booking.date), 'yyyy-MM-dd') : 'Not specified'}`}
                                />
                                <ParagraphComponent text={`Beginner: ${booking.beginner ? "Yes" : "No"}`} category="Surf level" />
                                <ParagraphComponent text={`Intermediate: ${booking.intermediate ? "Yes" : "No"}`} category="Surf Level" />
                                <ParagraphComponent text={`Advanced: ${booking.advanced ? "Yes" : "No"}`} category="Surf Level" />
                            </div>

                            {/* Like button */}
                            <div className="flex items-center justify-center p-4">
                                <BtnComponent onClick={() => bookingIsHandledClick(booking._id)} label="Read Booking" />
                                <BtnComponent onClick={() => showDeleteConfirmation(booking?._id)} label="Delete" />
                            </div>

                            {/* Booking information */}
                            <div className="">
                                <p className="likeCount">
                                    {booking.isHandled ? 'Handled' : ''}
                                </p>
                                <p className="bookingTime">{formatTimeDifference(booking.createdAt)}</p>

                                <BtnComponent />
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
