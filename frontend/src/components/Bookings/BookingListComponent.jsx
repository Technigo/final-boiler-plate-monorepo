import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { BtnComponent } from "../Reusables/BtnComonent";
import { ParagraphComponent } from "../Reusables/ParagraphComponent";
import { format, isValid } from 'date-fns';
import { useNavigate } from "react-router-dom";
import useBookingStore from '../../stores/bookingStore';

// Define the functional component for displaying bookings
export const BookingListComponent = ({ fetchAllBookings, fetchUnHandledBookings }) => {
    const [showDetailsMap, setShowDetailsMap] = useState({});
    const [showDateDetailsMap, setShowDateDetailsMap] = useState({});
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    const toggleDetails = (bookingId) => {
        setShowDetailsMap((prevDetailsMap) => ({
            ...prevDetailsMap,
            [bookingId]: !prevDetailsMap[bookingId],
        }));
        setSelectedBookingId(bookingId);
    };

    const toggleDateDetails = (timeKey) => {
        setShowDateDetailsMap((prevDateDetailsMap) => ({
            ...prevDateDetailsMap,
            [timeKey]: !prevDateDetailsMap[timeKey],
        }));
    };


    const navigate = useNavigate();

    // Destructure values from the custom hook
    const { bookings, fetchBookings, fetchHandledBookings, fetchUnHandledBookings: fetchUnhandledBookings, bookingIsHandledClick, handleDeleteBooking, formatTimeDifference, } = useBookingStore();

    // Function to group bookings by booking time, requested date, and groupId
    const groupBookingsByTimeAndGroup = () => {
        // Object to store grouped bookings
        const groupedBookings = {};

        // Iterate through each booking
        bookings.forEach((booking) => {
            try {
                // Parse the createdAt date
                const createdAtDate = new Date(booking.createdAt);
                // Check if createdAtDate is valid
                if (!isValid(createdAtDate)) {
                    console.error('Invalid createdAt value:', booking.createdAt);
                    return; // Skip invalid date
                }

                // Format createdAt date to 'yyyy-MM-dd HH:mm'
                const formattedCreatedAt = format(createdAtDate, 'yyyy-MM-dd HH:mm', { useAdditionalDayOfYearTokens: true }) || 'N/A';

                // Determine the group key (use 'individual' if no groupId)
                const groupKey = booking.groupId || 'individual';
                // Create a unique key combining date, hour, minute, booked date, and groupId
                const timeKey = formattedCreatedAt + '_' + groupKey;

                // Initialize an array for the timeKey if it doesn't exist
                if (!groupedBookings[timeKey]) {
                    groupedBookings[timeKey] = [];
                }

                // Add the booking to the corresponding timeKey
                groupedBookings[timeKey].push(booking);
            } catch (error) {

            }
        });

        // Return the grouped bookings
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

    // Group bookings by requested and booked time
    const groupedBookings = groupBookingsByTimeAndGroup();


    // Return the JSX for rendering
    return (
        <div>
            {Object.entries(groupedBookings).map(([timeKey, bookingsInGroup]) => (
                <div key={timeKey} className="border-2 border-black">

                    {/* Display a header indicating whether the bookings are grouped or single */}
                    <div className="text-base text-center pt-6 font-josefin-sans">
                        {bookingsInGroup.length > 1 ? 'Group' : 'Single'} booking created at{' '}
                        {format(new Date(timeKey.split('_')[0]), 'yyyy-MM-dd HH:mm')}
                        <br />


                        <BtnComponent
                            className="bg-gray-800 m-6 hover:bg-gray-600 text-white"
                            onClick={() => toggleDateDetails(timeKey)}
                            label={showDateDetailsMap[timeKey] ? "Show Less Bookings" : "Show Bookings"}
                        />
                    </div>

                    {/* Display a grid for each booking in the group */}
                    {showDateDetailsMap[timeKey] && (
                        <div className="m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">

                            {bookingsInGroup.map((booking, index) => (
                                <div key={index} className="flex justify-center items-center h-full max-w-lg" style={{ wordWrap: 'break-word' }}>
                                    <div className={`rounded-md px-4 mb-14 h-auto w-full ${booking.bookingIsHandled ? 'bg-emerald-300' : 'bg-red-300'}`}>
                                        <div>

                                            {/* Display various details about the booking */}
                                            <div>

                                                {/* Name, age weight*/}
                                                <ParagraphComponent text={`${booking.name}, ${booking.age} years old`} category="Name" />

                                                {/* Additional details - displayed conditionally */}
                                                {showDetailsMap[booking._id] && (
                                                    <>
                                                        <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-0" text={`${booking.weight || "N/A"}`} category="Weight" />
                                                        <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-0" text={`${booking.height || "N/A"}`} category="Height" />

                                                        {/* Documentation, display only the true ones) */}
                                                        {booking.film && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Yes" category="Film" />}
                                                        {booking.droneVideos && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Yes" category="Drone video" />}
                                                        {booking.advanced && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Yes" category="Photo" />}

                                                        {/* Email, phone, selected date */}
                                                        <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text={`${booking.email}`} category="Email" />
                                                        <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text={`${booking.phonenumber}`} category="Phone number" />
                                                        <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text={`Selected date: ${booking.message}`} />


                                                        {/* Surflevel, display only the true one) */}
                                                        {booking.beginner && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Beginner" category="Surf level" />}
                                                        {booking.intermediate && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Intermediate" category="Surf Level" />}
                                                        {booking.advanced && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Advanced" category="Surf Level" />}
                                                    </>
                                                )}
                                            </div>


                                            <div className="text-sm flex items-center justify-center">
                                                <BtnComponent
                                                    className="bg-gray-800 m-1 hover:bg-gray-600 text-white"
                                                    onClick={() => toggleDetails(booking._id)}
                                                    label={showDetailsMap[booking._id] ? "Read Less" : "Read More"}
                                                />
                                                {/* Buttons to handle the booking and delete the booking */}
                                                <BtnComponent
                                                    className="bg-green-800 m-1 hover:bg-gray-600 text-white"
                                                    onClick={() => bookingIsHandledClick(booking._id, booking.bookingIsHandled)}
                                                    label={booking.bookingIsHandled ? "Accepted" : "Accept booking"} />

                                                <BtnComponent className="bg-red-800 m-1 hover:bg-gray-600 text-white" onClick={() => handleDeleteBooking(booking._id)} label="Delete" />
                                            </div>
                                            {/* Display the time since the booking was created */}
                                            <ParagraphComponent className="text-xs py-0 pt-0 lg:py-0 lg:pt-2" text={`Created ${formatTimeDifference(booking.createdAt)}`} />

                                            {/* Display the exact creation time of the booking */}
                                            <ParagraphComponent className="text-xs py-0 pt-0 lg:py-0 lg:pt-2" text={`Exact time: ${(booking.createdAt)}`} />
                                        </div>
                                        <ParagraphComponent className={`py-0 pt-12 lg:py-0 lg:pt-2 ${booking.bookingIsHandled ? 'text-green-700' : 'text-red-700'}`} text={booking.bookingIsHandled ? 'Accepted' : 'Not accepted'} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            ))}

        </div>
    );
}