import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { SubHeadingComponent } from '../Reusables/SubHeadingComponent';
import { ParagraphComponent } from '../Reusables/ParagraphComponent';
import { BtnComponent } from '../Reusables/BtnComonent';
import { ReusableModal } from '../Reusables/ReusableModal';
import { userStore } from '../../stores/userStore';

// Ensure to set the app root element for react-modal
Modal.setAppElement('#root');

export const SortedByDate = () => {
    const [uniqueDates, setUniqueDates] = useState([]);
    const [bookingsByDate, setBookingsByDate] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Get authentication state and check if the user is authenticated
    const isAuthenticated = userStore((state) => state.isLoggedIn);


    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedDate(null);
    };

    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError(null);

            // Make an API request to fetch all bookings
            const response = await fetch(`${import.meta.env.VITE_API_URL}/booking/handledBookings/bookingsByDate`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('accessToken'),
                },
            });


            // Check if the request was successful
            if (response.ok) {
                // Parse the response data
                const bookings = await response.json();

                // Update the local state with the fetched bookings
                setBookingsByDate(bookings);

                // Extract unique dates from bookings
                const dates = Array.from(new Set(bookings.map((booking) => booking.date)));
                setUniqueDates(dates);
            } else {
                // Handle errors when the request fails
                console.error('Failed to fetch bookings');
                setError('Failed to fetch bookings');
            }
        } catch (error) {
            // Handle errors during the fetchBookings process
            setError(error.message);
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch bookings only if the user is authenticated
        if (isAuthenticated) {
            fetchBookings();
        }
    }, [isAuthenticated]);

    const handleReadMore = (date) => {
        setSelectedDate(date);
        openModal();
    };


    return (
        <>
            {/* Copy and paste the following lines where your existing code begins */}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <div className="m-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {uniqueDates.map((date) => {
                        const bookingsForDate = bookingsByDate.filter((booking) => booking.date === date);
                        const bookingCount = bookingsForDate.length;

                        let subHeadingColor;
                        if (bookingCount >= 1 && bookingCount <= 5) {
                            subHeadingColor = 'bg-green-500';
                        } else if (bookingCount >= 6 && bookingCount <= 9) {
                            subHeadingColor = 'bg-orange-500';
                        } else {
                            subHeadingColor = 'bg-red-500';
                        }

                        const formattedDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

                        return (
                            <div key={date} className={`rounded-md gap-4 text-base text-center p-6 font-josefin-sans ${subHeadingColor}`}>

                                <SubHeadingComponent className="text-base" text={`Bookings for ${formattedDate}`} />
                                <p>Total Bookings: {bookingsForDate.length}</p>
                                <BtnComponent className="bg-gray-800 m-1 hover:bg-gray-600 text-white" onClick={() => handleReadMore(date)} label="Open booking" />

                                {modalIsOpen && selectedDate === date && (
                                    <ReusableModal
                                        isOpen={modalIsOpen}
                                        onRequestClose={closeModal}
                                        contentLabel="Booking Details Modal"
                                        modalTitle={`Bookings details for ${formattedDate}`}>

                                        <div>

                                            <ParagraphComponent className="text-base text-center" text={`Total Bookings: ${bookingsForDate.length}`} />

                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 m-6'>
                                                {bookingsForDate.map((booking) => (
                                                    <div key={booking._id} className='border border-2 border black p-6'>
                                                        <ParagraphComponent text={`${booking.name}, ${booking.age} years old`} category="Name" />
                                                        <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-0" text={`${booking.weight || "N/A"}`} category="Weight" />
                                                        <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-0" text={`${booking.height || "N/A"}`} category="Height" />

                                                        <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text={`${booking.email}`} category="Email" />
                                                        <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text={`${booking.phonenumber}`} category="Phone number" />
                                                        <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text={`Other message: ${booking.message}`} />


                                                        {booking.film && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Yes" category="Film" />}
                                                        {booking.droneVideos && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Yes" category="Drone video" />}
                                                        {booking.advanced && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Yes" category="Photo" />}

                                                        {booking.beginner && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Beginner" category="Surf level" />}
                                                        {booking.intermediate && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Intermediate" category="Surf Level" />}
                                                        {booking.advanced && <ParagraphComponent className="py-0 pt-0 lg:py-0 lg:pt-2" text="Advanced" category="Surf Level" />}

                                                        <ParagraphComponent className={`py-0 pt-12 lg:py-0 lg:pt-2 ${booking.bookingIsHandled ? 'text-green-700' : 'text-red-700'}`} text={booking.bookingIsHandled ? 'Accepted' : 'Not accepted'} />
                                                    </div>

                                                ))}
                                            </div>
                                        </div>
                                    </ReusableModal>
                                )}

                            </div>
                        );
                    })}
                </div>
            )}

        </>
    );
};