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
