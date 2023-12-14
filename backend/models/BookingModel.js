import mongoose from "mongoose";

// Define the Mongoose model for thoughts
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
    },
    weight: {
        type: Number,
        min: 0,
    },
    height: {
        type: Number,
        min: 0,
    },
    message: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 140,
        trim: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    hearts: {
        type: Number,
        default: 0,
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking; 