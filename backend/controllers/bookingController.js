import { Resend } from 'resend';
import Booking from '../models/BookingModel';
import { handleErrors } from './commonController';
require('dotenv').config();

const resend = new Resend(process.env.BOOKING_RESEND_API_KEY);
// Check if the initialization was successful
if (!resend) {
    throw new Error('Resend initialization failed');
}

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
        // Send a welcome/confirmation email to the subscriber
        const subject = 'Booking Confirmation - Tuanis Surf School';
        const htmlContent = `<p>Thank you for booking with Tuanis Surf School. We are excited to confirm your reservation! Get ready for an unforgettable surfing experience. We will soon get back to you with a confirmation.
        Our team is looking forward to providing you with excellent service. If you have any questions or need further assistance, feel free to reach out at +506 6140-7609 or tuanissurfschool@gmail.com. Get ready to ride the waves with Tuanis Surf School! 
        </p>`;

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject,
            html: htmlContent,
        })

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