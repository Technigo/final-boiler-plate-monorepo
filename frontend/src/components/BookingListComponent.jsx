// Import necessary dependencies and components
import React, { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
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
    const { bookings, fetchBookings, fetchHandledBookings, fetchUnHandledBookings: fetchUnhandledBookings, bookingIsHandledClick, handleDeleteBooking } = useBookingStore();

    // Function to format the time difference from the current time
    const formatTimeDifference = (timestamp) => {
        if (!timestamp || !isValid(new Date(timestamp))) {
            console.error('Invalid timestamp:', timestamp);
            return "Invalid date";
        }

        const currentTime = new Date();
        const bookingTime = new Date(timestamp);
        return formatDistanceToNow(bookingTime, { addSuffix: true });
    };

    // Function to confirm booking deletion
    const showDeleteConfirmation = (bookingId) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this booking?");
        if (userConfirmed) {
            // User clicked OK, proceed with the deletion
            handleDeleteBooking(bookingId);
        } else {
            // User clicked Cancel, do nothing
        }
    };

    // Function to confirm marking a booking as handled
    const ShowbookingIsHandledClickConfirmation = async (bookingId, currentHandledState) => {
        const userConfirmed = window.confirm("Are you sure you want to mark this booking as handled?");
        if (userConfirmed) {
            // User clicked OK, proceed with marking the booking as handled
            // Update the booking on the server
            await bookingIsHandledClick(bookingId, currentHandledState);
        } else {
            // User clicked Cancel, do nothing
        }
    };

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
                } else {
                    await fetchHandledBookings();
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchData();
    }, [fetchAllBookings, fetchUnHandledBookings, fetchBookings, fetchHandledBookings, fetchUnhandledBookings]);

    // Group bookings by time
    const groupedBookings = groupBookingsByTimeAndGroup();

    // Return the JSX for rendering
    return (
        <div className="">
            {Object.entries(groupedBookings).map(([timeKey, bookingsInGroup]) => (
                <div key={timeKey}>


                    {/* Display a header indicating whether the bookings are grouped or single */}

                    <SubHeadingComponent
                        text={`${bookingsInGroup.length > 1 ? 'Group' : 'Single'} booking created at ${format(new Date(timeKey.split('_')[0]), 'yyyy-MM-dd HH:mm')} requested date: ${format(new Date(timeKey.split('_')[1]), 'yyyy-MM-dd')}`}
                    />

                    {/* Display a grid for each booking in the group */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {bookingsInGroup.map((booking, index) => (
                            <div key={index} className="flex justify-center items-center h-auto">
                                <div className="rounded-md bg-customPink p-4">
                                    <div>
                                        {/* Display various details about the booking */}
                                        {/* Name, age weight*/}
                                        <ParagraphComponent text={`${booking.name}, ${booking.age} years old`} category="Name" />
                                        <ParagraphComponent text={`${booking.weight || "N/A"}`} category="Weight" />
                                        <ParagraphComponent text={`${booking.height || "N/A"}`} category="Height" />

                                        {/* Documentation, display only the true ones) */}
                                        {booking.film && <ParagraphComponent text="film: Yes" category="Documentation" />}
                                        {booking.droneVideos && <ParagraphComponent text="Drone Videos: Yes" category="Documentation" />}
                                        {booking.advanced && <ParagraphComponent text="Photo: Yes" category="Photo" />}

                                        {/* Email, phone, selected date */}
                                        <ParagraphComponent text={`${booking.email}`} category="Email" />
                                        <ParagraphComponent text={`${booking.phonenumber}`} category="Phone number" />
                                        <ParagraphComponent text={`Other message: ${booking.message}`} />
                                        <ParagraphComponent
                                            text={`Selected Date: ${isValid(new Date(booking.date)) ? format(new Date(booking.date), 'yyyy-MM-dd') : 'Not specified'}`}
                                        />

                                        {/* Surflevel, display only the true one) */}
                                        {booking.beginner && <ParagraphComponent text="Beginner: Yes" category="Surf level" />}
                                        {booking.intermediate && <ParagraphComponent text="Intermediate: Yes" category="Surf Level" />}
                                        {booking.advanced && <ParagraphComponent text="Advanced: Yes" category="Surf Level" />}
                                    </div>


                                    <div className="flex items-center justify-center p-4">

                                        {/* Buttons to handle the booking and delete the booking */}
                                        <BtnComponent onClick={() => ShowbookingIsHandledClickConfirmation(booking._id, booking.bookingIsHandled)} label="Booking Handled" />
                                        <BtnComponent onClick={() => showDeleteConfirmation(booking?._id)} label="Delete" />

                                        <BtnComponent label="View Tasks" onClick={() => navigate(`/booking/${booking._id}`)}
                                        />
                                    </div>

                                    <div className="">

                                        {/* Display if the booking is handled */}
                                        <ParagraphComponent text={booking.bookingIsHandled ? 'Handled' : ''} />

                                        {/* Display the time since the booking was created */}
                                        <ParagraphComponent text={`Created ${formatTimeDifference(booking.createdAt)}`} />

                                        {/* Display the exact creation time of the booking */}
                                        <ParagraphComponent text={`Exact time: ${(booking.createdAt)}`} />

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}