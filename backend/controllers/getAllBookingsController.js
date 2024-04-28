import Booking from '../models/BookingModel';
import { handleErrors } from './commonController';

// Get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: 'desc' }).exec();
        res.json(bookings);
    } catch (error) {
        // Utilize the existing handleErrors function
        handleErrors(res, error);
    }
};
