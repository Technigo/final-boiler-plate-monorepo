import mongoose from 'mongoose';

const { Schema } = mongoose;

const ShowtimeSchema = new Schema({
  movieTitle: {
    type: String,
    required: true,
  },
  cinemaHall: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  startingTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seat: {
    type: Number,
    required: true,
  },
});

export const ShowTimeModel = mongoose.model('ShowTime', ShowtimeSchema);
export default ShowTimeModel;
