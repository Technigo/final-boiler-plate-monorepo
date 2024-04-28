import Booking from '../models/BookingModel';
import { handleErrors } from './commonController';

// Get unhandled bookings
export const getUnhandledBookings = async (req, res) => {
    try {
        const unhandledBookings = await Booking.find({ bookingIsHandled: false }).sort({ createdAt: -1 }).exec();
        res.json(unhandledBookings);
    } catch (error) {
        // Utilize the existing handleErrors function
        handleErrors(res, error);
    }
};
