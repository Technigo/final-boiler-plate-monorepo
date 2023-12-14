import express from 'express';
import Booking from '../models/BookingModel';

const router = express.Router();

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: 'desc' }).limit(20).exec();
        res.json(bookings);
    } catch (error) {
        // Use the handleErrors function for consistent error handling
        handleErrors(res, error);
    }
});

// Post a new booking
router.post('/', async (req, res) => {
    const { name, age, weight, height, video, film, droneVideos, message } = req.body;

    try {
        // Validate the length of the message
        if (message.length < 5 || message.length > 140) {
            throw new Error('Invalid message length');
        }

        // Create a new Booking instance
        const booking = new Booking({
            name,
            age,
            weight,
            height,
            video,
            film,
            droneVideos,
            message,
            complete: true,
        });

        // Save it to the database
        const savedBooking = await booking.save();

        // Respond with the saved booking
        res.status(201).json(savedBooking);
    } catch (error) {
        // Use the handleErrors function for consistent error handling
        handleErrors(res, error, 400, 'Bad Request');
    }
});

// Post a like for a specific booking
router.post('/:bookingId/like', async (req, res) => {
    const { bookingId } = req.params;

    try {
        // Find the booking by its ID
        const booking = await Booking.findById(bookingId);

        // Handle the case where the booking is not found
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Increment the hearts count and save the updated booking
        booking.hearts += 1;
        const savedBooking = await booking.save();

        // Respond with the updated booking
        res.status(201).json(savedBooking);
    } catch (error) {
        // Use the handleErrors function for consistent error handling
        handleErrors(res, error, 400, 'Booking not found. Could not add a like!');
    }
});

export default router;
