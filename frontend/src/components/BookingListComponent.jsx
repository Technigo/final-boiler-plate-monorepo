// Import necessary dependencies and components
import React, { useEffect } from "react";
import { BtnComponent } from "./BtnComonent";
import { ParagraphComponent } from "./ParagraphComponent";
import { format, isValid } from 'date-fns';
import useBookingStore from '../stores/bookingStore';
import { SubHeadingComponent } from "./SubHeadingComponent";
import { Link, useNavigate } from "react-router-dom";

// Define the functional component for displaying bookings
export const BookingListComponent = ({ fetchAllBookings, fetchUnHandledBookings }) => {

    const navigate = useNavigate();

    // Destructure values from the custom hook
    const { bookings, fetchBookings, fetchHandledBookings, fetchUnHandledBookings: fetchUnhandledBookings, bookingIsHandledClick, handleDeleteBooking, formatTimeDifference, } = useBookingStore();

    // Function to group bookings by booking time, requested date, and groupId
    const groupBookingsByTimeAndGroup = () => {
        const groupedBookings = {};
        bookings.forEach((booking) => {
            try {
                const createdAtDate = new Date(booking.createdAt);
                if (!isValid(createdAtDate)) {
                    console.error('Invalid createdAt value:', booking.createdAt);
                    return;
                }

                const bookedDate = new Date(booking.date);
                if (!isValid(bookedDate)) {
                    console.error('Invalid bookedDate value:', booking.date);
                    return;
                }

                const formattedCreatedAt = format(createdAtDate, 'yyyy-MM-dd HH:mm', { useAdditionalDayOfYearTokens: true }) || 'N/A';
                const formattedBookedDate = format(bookedDate, 'yyyy-MM-dd', { useAdditionalDayOfYearTokens: true }) || 'N/A';

                const groupKey = booking.groupId || 'individual'; // If no groupId, use 'individual'
                const timeKey = formattedCreatedAt + '_' + formattedBookedDate + '_' + groupKey; // Group by date, hour, minute, booked date, and groupId
                if (!groupedBookings[timeKey]) {
                    groupedBookings[timeKey] = [];
                }
                groupedBookings[timeKey].push(booking);
            } catch (error) {
                console.error('Error processing booking:', booking);
                console.error('Error details:', error);
            }
        });
        return groupedBookings;
    };

    // useEffect to fetch bookings when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (fetchAllBookings) {
                    await fetchBookings();
                } else if (fetchUnHandledBookings) {
                    await fetchUnhandledBookings();
                    console.log('Bookings after fetching unhandled:', bookings);

                } else {
                    await fetchHandledBookings();
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchData();
    }, [fetchAllBookings, fetchUnHandledBookings, fetchBookings, fetchHandledBookings, fetchUnhandledBookings]);

    // Display a message if there are no bookings
    if (!bookings || bookings.length === 0) {
        return (
            <div className="h-screen flex justify-center">
                <ParagraphComponent text="No bookings available." />
            </div>);
    }

    // Group bookings by time
    const groupedBookings = groupBookingsByTimeAndGroup();

    // Return the JSX for rendering
    return (
        <div className="">
            {Object.entries(groupedBookings).map(([timeKey, bookingsInGroup]) => (
                <div key={timeKey}>

                    {/* Display a header indicating whether the bookings are grouped or single */}
                    <SubHeadingComponent
                        text={`${bookingsInGroup.length > 1 ? 'Group' : 'Single'} booking created at ${format(new Date(timeKey.split('_')[0]), 'yyyy-MM-dd HH:mm')} requested date: ${format(new Date(timeKey.split('_')[1]), 'yyyy-MM-dd')}`} />

                    {/* Display a grid for each booking in the group */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {bookingsInGroup.map((booking, index) => (
                            <div key={index} className="mx-10 flex justify-center items-center h-auto">
                                <div className="rounded-md bg-backgroundPink border-solid border-2 border-customPink px-4">
                                    <div>
                                        {/* Display various details about the booking */}
                                        <div>
                                            {/* Name, age weight*/}
                                            <ParagraphComponent text={`${booking.name}, ${booking.age} years old`} category="Name" />
                                            <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-0" text={`${booking.weight || "N/A"}`} category="Weight" />
                                            <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-0" text={`${booking.height || "N/A"}`} category="Height" />

                                            {/* Documentation, display only the true ones) */}
                                            {booking.film && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="film: Yes" category="Documentation" />}
                                            {booking.droneVideos && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Drone Videos: Yes" category="Documentation" />}
                                            {booking.advanced && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Photo: Yes" category="Photo" />}

                                            {/* Email, phone, selected date */}
                                            <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text={`${booking.email}`} category="Email" />
                                            <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text={`${booking.phonenumber}`} category="Phone number" />
                                            <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text={`Other message: ${booking.message}`} />
                                            <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2"
                                                text={`Selected Date: ${isValid(new Date(booking.date)) ? format(new Date(booking.date), 'yyyy-MM-dd') : 'Not specified'}`} />

                                            {/* Surflevel, display only the true one) */}
                                            {booking.beginner && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Beginner: Yes" category="Surf level" />}
                                            {booking.intermediate && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Intermediate: Yes" category="Surf Level" />}
                                            {booking.advanced && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Advanced: Yes" category="Surf Level" />}
                                        </div>

                                        <div className="py-0 pt-0 lg:py-0 lg:pt-2">
                                        </div>
                                        {/* Display the time since the booking was created */}
                                        <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text={`Created ${formatTimeDifference(booking.createdAt)}`} />

                                        {/* Display the exact creation time of the booking */}
                                        <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text={`Exact time: ${(booking.createdAt)}`} />
                                    </div>
                                    <div className="flex items-center justify-center">

                                        {/* Buttons to handle the booking and delete the booking */}
                                        <BtnComponent
                                            className="m-2"
                                            onClick={() => bookingIsHandledClick(booking._id, booking.bookingIsHandled)}
                                            label={booking.bookingIsHandled ? "Mark as Not Handled" : "Mark as Handled"} />

                                        <BtnComponent className="m-2" onClick={() => handleDeleteBooking(booking._id)} label="Delete" />
                                    </div>
                                    <ParagraphComponent className={`py-0 pt-12 lg:py-0 lg:pt-2 ${booking.bookingIsHandled ? 'text-green-700' : 'text-red-700'}`} text={booking.bookingIsHandled ? 'Handled' : 'Not handled'} />
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}