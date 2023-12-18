// bookingStore.js
import { create } from 'zustand';

const useBookingStore = create((set) => ({
    bookings: [],


    bookingIsHandledClick: async (bookingId) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/booking/${bookingId}/handled`, {
                method: 'POST',
            });

            // Update the local state to mark the booking as handled
            set((state) => ({
                bookings: state.bookings.map((booking) =>
                    booking._id === bookingId
                        ? { ...booking, isHandled: true }
                        : booking
                ),
            }));
        } catch (error) {
            console.error('Error:', error);
        }
    },


    //delete one booking by id 
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

    //fetch all bookings
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

}));


export default useBookingStore;
