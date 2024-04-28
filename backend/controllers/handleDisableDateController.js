import Booking from '../models/BookingModel';
import { handleErrors } from './commonController';

// Controller function to handle disabling date
export const handleDisableDate = async (req, res) => {
    const { bookingId } = req.params;
    const { dateToDisable } = req.body;

    try {
        // Find the booking document by ID
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Push the date to be disabled into the disabledDates array
        booking.disabledDates.push(dateToDisable);

        // Save the updated booking document
        const updatedBooking = await booking.save();

        // Send a success response
        res.status(200).json({ message: 'Date disabled successfully', booking: updatedBooking });
    } catch (error) {
        // Handle errors
        console.error('Error disabling date:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};