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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {bookingsInGroup.map((booking, index) => (
                            <div key={index} className="mx-10 flex justify-center items-center h-auto">
                                <div className="rounded-md bg-backgroundPink border-solid border-2 border-customPink px-4">
                                    <div>
                                        {/* Display various details about the booking */}
                                        {/* Name, age weight*/}
                                        <ParagraphComponent className="py-0 pt-12 lg:py-0 lg:pt-12" text={`${booking.name}, ${booking.age} years old`} category="Name" />
                                        <ParagraphComponent className="py-0 pt-12 lg:py-0 lg:pt-2" text={`${booking.weight || "N/A"}`} category="Weight" />
                                        <ParagraphComponent className="py-0 pt-12 lg:py-0 lg:pt-2" text={`${booking.height || "N/A"}`} category="Height" />

                                        {/* Documentation, display only the true ones) */}
                                        {booking.film && <ParagraphComponent className="py-0 pt-12 lg:py-0 lg:pt-2" text="film: Yes" category="Documentation" />}
                                        {booking.droneVideos && <ParagraphComponent className="py-0 pt-12 lg:py-0 lg:pt-2" text="Drone Videos: Yes" category="Documentation" />}
                                        {booking.advanced && <ParagraphComponent className="py-0 pt-12 lg:py-0 lg:pt-2" text="Photo: Yes" category="Photo" />}

                                        {/* Email, phone, selected date */}
                                        <ParagraphComponent className="py-0 pt-12 lg:py-0 lg:pt-2" text={`${booking.email}`} category="Email" />
                                        <ParagraphComponent className="py-0 pt-12 lg:py-0 lg:pt-2" text={`${booking.phonenumber}`} category="Phone number" />
                                        <ParagraphComponent className="py-0 pt-12 lg:py-0 lg:pt-2" text={`Other message: ${booking.message}`} />
                                        <ParagraphComponent className="py-0 pt-12 lg:py-0 lg:pt-2"
                                            text={`Selected Date: ${isValid(new Date(booking.date)) ? format(new Date(booking.date), 'yyyy-MM-dd') : 'Not specified'}`}
                                        />

                                        {/* Surflevel, display only the true one) */}
                                        {booking.beginner && <ParagraphComponent className="py-0 pt-12 lg:py-0 lg:pt-2" text="Beginner: Yes" category="Surf level" />}
                                        {booking.intermediate && <ParagraphComponent className="py-0 pt-12 lg:py-0 lg:pt-2" text="Intermediate: Yes" category="Surf Level" />}
                                        {booking.advanced && <ParagraphComponent className="py-0 pt-12 lg:py-0 lg:pt-2" text="Advanced: Yes" category="Surf Level" />}
                                    </div>

                                    <div className="py-0 pt-12 lg:py-0 lg:pt-2">

                                        {/* Display the time since the booking was created */}
                                        <ParagraphComponent className="py-0 pt-12 lg:py-0 lg:pt-2" text={`Created ${formatTimeDifference(booking.createdAt)}`} />

                                        {/* Display the exact creation time of the booking */}
                                        <ParagraphComponent className="py-0 pt-12 lg:py-0 lg:pt-2" text={`Exact time: ${(booking.createdAt)}`} />

                                    </div>

                                    <div className="flex items-center justify-center">

                                        {/* Buttons to handle the booking and delete the booking */}
                                        <BtnComponent className="m-2" onClick={() => ShowbookingIsHandledClickConfirmation(booking._id, booking.bookingIsHandled)} label="Booking Handled" />


                                        <BtnComponent className="m-2" onClick={() => showDeleteConfirmation(booking?._id)} label="Delete" />

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