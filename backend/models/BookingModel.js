import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
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
    beginner: {
        type: Boolean,
        default: false,
    },
    intermediate: {
        type: Boolean,
        default: false,
    },
    advanced: {
        type: Boolean,
        default: false,
    },
    film: {
        type: Boolean,
        default: false,
    },
    droneVideos: {
        type: Boolean,
        default: false,
    },
    photo: {
        type: Boolean,
        default: false,
    },
    phonenumber: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^\+?\d{10,15}$/.test(value),
            message: "Invalid phone number format",
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(value), // Basic email validation
            message: "Invalid email format",
        },
    },
    message: {
        type: String,
        maxlength: 140,
        trim: true,
    },
    date: {
        type: Date,
        required: false,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    bookingIsHandled: {
        type: Boolean,
        default: false,
    },
    groupID: {
        type: String,
        default: null,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

});

bookingSchema.statics.getBookings = async function () {
    try {
        const bookings = await this.find().exec();
        return bookings;
    } catch (error) {
        throw new Error(`Error fetching bookings: ${error.message}`);
    }
};

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
