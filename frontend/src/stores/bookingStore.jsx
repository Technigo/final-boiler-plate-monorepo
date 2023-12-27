// bookingStore.js
import { create } from 'zustand';

const useBookingStore = create((set) => ({
    bookings: [],

    bookingIsHandledClick: async (bookingId, currentHandledState) => {
        try {
            const newHandledState = !currentHandledState;

            // Update the booking on the server
            await fetch(`${import.meta.env.VITE_API_URL}/booking/${bookingId}/handled`, {
                method: 'POST',
            });

            // Update the local state to toggle the handled state
            set((state) => ({
                bookings: state.bookings.map((booking) =>
                    booking._id === bookingId
                        ? { ...booking, bookingIsHandled: newHandledState }
                        : booking
                ),
            }));
        } catch (error) {
            console.error('Error:', error);
        }
    },

    // Delete one booking by id 
    handleDeleteBooking: async (id) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/booking/deleteBooking/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('accessToken'),
                },
            });

            // Remove the deleted booking from the bookings array
            set((state) => ({
                bookings: state.bookings.filter((booking) => booking._id !== id),
            }));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    },

    fetchBookings: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/booking`);
            const data = await response.json();

            // Update the local state with the fetched bookings
            set({ bookings: data });
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    },


    fetchHandledBookings: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/booking/handledBookings`);
            const data = await response.json();

            // Update the local state with the fetched handled bookings
            set({ bookings: data });
        } catch (error) {
            console.error('Error fetching handled bookings:', error);
        }
    },
    fetchUnHandledBookings: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/booking/unhandledBookings`);
            const data = await response.json();

            // Update the local state with the fetched handled bookings
            set({ bookings: data });
        } catch (error) {
            console.error('Error fetching handled bookings:', error);
        }
    },
    handleDeleteAllBookings: async () => {
        try {
            // Trigger the deleteAllBookings action from the store
            const response = await fetch(`${import.meta.env.VITE_API_URL}/booking/deleteAll`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('accessToken'),
                },
            });

            const result = await response.json();

            console.log(result.message);
        } catch (error) {
            console.error('Error deleting all bookings:', error);
        }
    },
}));

export default useBookingStore;
