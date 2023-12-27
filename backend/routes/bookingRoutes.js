// bookingRoute.js
import express from 'express';
import Booking from '../models/BookingModel';
import UserModel from '../models/UserModel'; // Make sure to use the correct path to your UserModel file

const router = express.Router();


// Get all bookings
router.get('/', async (req, res) => {
    try {
        // Use the find method and add sorting by createdAt in descending order
        const bookings = await Booking.find().sort({ createdAt: 'desc' }).exec();
        res.json(bookings);
    } catch (error) {
        // Use the handleErrors function for consistent error handling
        handleErrors(res, error);
    }
});


// Post a new booking
router.post('/', async (req, res) => {
    console.log(req.body);
    const { name, age, weight, height, film, droneVideos, photo, phonenumber, email, message, date, beginner, intermediate, advanced, createdAt, bookingIsHandled, groupID, singleID } = req.body;

    try {
        // Validate the length of the message
        if (message.length > 140) {
            throw new Error('Invalid message length');
        }

        // Create a new Booking instance
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
            complete: false, // Set complete to false by default
            groupID,
            singleID
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

// Your existing code
router.post('/:bookingId/handled', async (req, res) => {
    const { bookingId } = req.params;

    try {
        // Find the booking by its ID
        const booking = await Booking.findById(bookingId);

        // Handle the case where the booking is not found
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Update the property to indicate the booking has been handled
        booking.bookingIsHandled = true;

        // Save the updated booking
        const savedBooking = await booking.save();

        // Respond with the updated booking
        res.status(201).json(savedBooking);
    } catch (error) {
        // Use the handleErrors function for consistent error handling
        handleErrors(res, error, 400, 'Booking not found. Could not mark as handled!');
    }
});

// Fetch only the handled bookings
router.get('/handledBookings', async (req, res) => {
    try {
        const handledBookings = await Booking.find({ bookingIsHandled: true }).sort({ createdAt: -1 }).exec();
        res.json(handledBookings);
    } catch (error) {
        handleErrors(res, error);
    }
});

// Fetch only the unhandled bookings
router.get('/unhandledBookings', async (req, res) => {
    try {
        const unhandledBookings = await Booking.find({ bookingIsHandled: false }).sort({ createdAt: -1 }).exec();
        res.json(unhandledBookings);
    } catch (error) {
        handleErrors(res, error);
    }
});
// DELETE a specific booking by ID
router.delete("/deleteBooking/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the booking by its ID and delete it
        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (deletedBooking) {
            // Respond with the deleted booking
            res.json({
                message: "Booking deleted successfully",
                deletedBooking,
            });
        } else {
            // Respond with a 404 status if the booking was not found
            res.status(404).json({ message: "Booking not found" });
        }
    } catch (error) {
        // Use the handleErrors function for consistent error handling
        handleErrors(res, error);
    }

});
// DELETE all bookings
router.delete("/deleteAll", async (req, res) => {
    try {
        // Perform the deletion without filtering by user
        const result = await Booking.deleteMany({});

        res.json({
            message: "All bookings deleted",
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;
