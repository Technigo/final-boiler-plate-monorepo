import Booking from '../models/BookingModel';
import { handleErrors } from './commonController';

// Mark a booking as handled
export const markBookingAsHandled = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.bookingIsHandled = true;
        const savedBooking = await booking.save();

        res.status(201).json(savedBooking);
    } catch (error) {
        // Utilize the existing handleErrors function
        handleErrors(res, error, 400, 'Booking not found. Could not mark as handled!');
    }
};