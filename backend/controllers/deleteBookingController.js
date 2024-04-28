import Booking from '../models/BookingModel';
import { handleErrors } from './commonController';

// Delete all bookings
export const deleteAllBookings = async (req, res) => {
    try {
        const result = await Booking.deleteMany({});
        res.json({
            message: 'All bookings deleted',
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        // Utilize the existing handleErrors function
        handleErrors(res, error);
    }
};


// Delete a specific booking by ID
export const deleteBookingById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (deletedBooking) {
            res.json({
                message: 'Booking deleted successfully',
                deletedBooking,
            });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        // Utilize the existing handleErrors function
        handleErrors(res, error);
    }
};