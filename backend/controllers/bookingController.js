import Booking from '../models/BookingModel';
import { handleErrors } from './commonController';

// Validate message length
const validateMessageLength = (message) => {
    if (message.length > 140) {
        throw new Error('Invalid message length');
    }
};

// Create a new booking
export const createBooking = async (req, res) => {
    const { name, age, weight, height, film, droneVideos, photo, phonenumber, email, message, date, beginner, intermediate, advanced, createdAt, bookingIsHandled, groupID, singleID } = req.body;

    try {
        validateMessageLength(message);

        const booking = new Booking({
            name,
            age,
            weight,
            height,
            film,
            droneVideos,
            photo,
            email,
            phonenumber,
            message,
            date,
            beginner,
            intermediate,
            advanced,
            createdAt,
            bookingIsHandled,
            complete: false,
            groupID,
            singleID,
        });

        const savedBooking = await booking.save();

        res.status(201).json(savedBooking);
    } catch (error) {
        // Utilize the existing handleErrors function
        handleErrors(res, error, 400, 'Bad Request');
    }
};

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