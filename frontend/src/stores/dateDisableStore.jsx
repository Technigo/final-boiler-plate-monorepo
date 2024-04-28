// dateDisableStore.js

import create from 'zustand';

const useDateDisableStore = create((set) => ({
    handleDisableDate: async (bookingId, dateToDisable) => {
        try {
            const response = await fetch(`/bookings/${bookingId}/disableDate`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dateToDisable }),
            });

            if (!response.ok) {
                throw new Error('Failed to disable date');
            }

            // Handle response data
            const updatedBooking = await response.json();

            // Update local state with the updated booking information
            // For example, you can set it to the store state or pass it to another function
            set({ updatedBooking });

            // Perform additional actions if necessary, such as updating local state
        } catch (error) {
            console.error('Error disabling date:', error.message);
            // Handle errors as needed
        }
    },
}));

export default useDateDisableStore;
