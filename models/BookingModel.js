import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, //primary key
    ref: 'User',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    require: true,
  },
  showtimeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShowTime',
    require: true,
  },
});

export const BookingModel = mongoose.model('Booking', bookingSchema);
export default BookingModel;
