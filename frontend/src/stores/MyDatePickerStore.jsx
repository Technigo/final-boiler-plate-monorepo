import { create } from 'zustand';
import { userStore } from './userStore';

const useMyDatePickerStore = create((set) => ({
    // State to store the disabled dates
    disabledDates: [],
    // State to hold user authentication status
    isAuthenticated: userStore.isAuthenticated,
    // Action to check if the user is authenticated
    checkAuthentication: () => {
        set({ isAuthenticated: userStore.isAuthenticated });
    },
    // Function to fetch handled bookings and update the disabled dates
    fetchHandledBookings: async () => {
        try {
            // Fetch handled bookings from the API
            const apiUrl = `${import.meta.env.VITE_API_URL}/booking/handledBookings`;
            const accessToken = localStorage.getItem('accessToken');

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    Authorization: accessToken,
                },
            });

            // Parse the response as JSON
            const handledBookings = await response.json();

            // Check if the response is an array
            if (Array.isArray(handledBookings)) {
                // Perform additional processing if needed
                const currentDate = new Date();

                const bookingCountsByDate = {};

                // Calculate the count of bookings for each date
                handledBookings.forEach((booking) => {
                    const bookedDate = new Date(booking.date);
                    const formattedBookedDate = bookedDate.toISOString().split('T')[0];

                    // Initialize the count for the date if it doesn't exist
                    if (!bookingCountsByDate[formattedBookedDate]) {
                        bookingCountsByDate[formattedBookedDate] = 0;
                    }

                    // Increment the count for the date
                    bookingCountsByDate[formattedBookedDate]++;
                });

                // Convert the booking counts to an array of disabled dates
                const datesToDisable = Object.entries(bookingCountsByDate)
                    .filter(([formattedDate, count]) => count >= 10)
                    .map(([formattedDate]) => new Date(formattedDate));

                // Logic to disable dates with 9 or more bookings
                const datesToLimit = Object.entries(bookingCountsByDate)
                    .filter(([formattedDate, count]) => count === 10)
                    .map(([formattedDate]) => new Date(formattedDate));

                // Add these dates to the disabled dates
                datesToDisable.push(...datesToLimit);

                // Logic to disable dates less than 2 days from now
                const twoDaysFromNow = new Date();
                twoDaysFromNow.setDate(currentDate.getDate() + 2);

                if (twoDaysFromNow > currentDate) {
                    datesToDisable.push(new Date(currentDate));
                }

                // Set the disabled dates in the store state
                set({ disabledDates: datesToDisable });
            }
        } catch (error) {
            // Handle errors that may occur during the fetch
            console.error('Error fetching handled bookings:', error);
        }
    },
}));

export default useMyDatePickerStore; 