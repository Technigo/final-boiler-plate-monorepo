import Booking from '../models/BookingModel';
import { handleErrors } from './commonController';

// Modify the getBookingsByDate function in your controller
export const getHandledBookingsByDate = async (req, res) => {
    try {
        // Your existing logic to retrieve handled bookings
        const handledBookings = await Booking.find({ bookingIsHandled: true });

        // Sort the handled bookings by the nearest date
        handledBookings.sort((a, b) => new Date(a.date) - new Date(b.date));

        res.status(200).json(handledBookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get handled bookings
export const getHandledBookings = async (req, res) => {
    try {
        const handledBookings = await Booking.find({ bookingIsHandled: true }).sort({ createdAt: -1 }).exec();
        res.json(handledBookings);
    } catch (error) {
        // Utilize the existing handleErrors function
        handleErrors(res, error);
    }
};