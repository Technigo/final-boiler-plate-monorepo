import express from 'express';
import BookingModel from '../models/BookingModel';

const bookingRouter = express.Router();

bookingRouter.get('/bookings', async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    if (bookings.length > 0) {
      res.json(bookings);
    } else {
      res.status(404).json({ error: 'No booking found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

bookingRouter.post('/bookings/add', async (req, res) => {
  try {
    const { userId, movieId, price, showtimeId } = req.body;
    if (!userId || !movieId || !price || !showtimeId)
      return res.status(400).json({ error: 'Missing required information' });

    const newBooking = new BookingModel({
      userId: userId,
      movieId: movieId,
      price: price,
      showtimeId: showtimeId,
    });

    const saveBooking = await newBooking.save();
    res.status(201).json(saveBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default bookingRouter;
