import mongoose from 'mongoose';

const { Schema } = mongoose;

const ShowtimeSchema = new Schema({
  movieTitle: {},
  cinemaHall: {},

  date: {},

  startingTime: {},
  endTime: {},
  price: {},
  seat: {},
});

export const ShowTimeModel = mongoose.model('ShowTime', ShowtimeSchema);
export default ShowTimeModel;
