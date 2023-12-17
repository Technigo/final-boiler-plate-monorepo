// controllers/bookingController.js

import BookingModel from '../models/BookingModel'

// Get all bookings
export const getAllBookings = async (req, res) => {
	try {
		const bookings = await BookingModel.find()
		if (bookings.length > 0) {
			res.json(bookings)
		} else {
			res.status(404).json({ error: 'No previous bookings found' })
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get booking by ID
export const getBookingById = async (req, res) => {
	try {
		const bookingId = +req.params.id
		const booking = await BookingModel.findById(bookingId)
		if (booking) {
			res.json(booking)
		} else {
			res.status(404).json({ error: `Booking with id ${bookingId} not found.` })
		}
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong, please try again.' })
	}
}

// Add a new booking
export const addBooking = async (req, res) => {
	try {
		const { userId, movieId, price, showtimeId } = req.body
		if (!userId || !movieId || !price || !showtimeId)
			return res.status(400).json({ error: 'Missing required information' })

		const newBooking = new BookingModel({
			userId: userId,
			movieId: movieId,
			price: price,
			showtimeId: showtimeId,
		})

		const saveBooking = await newBooking.save()
		res.status(201).json(saveBooking)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
