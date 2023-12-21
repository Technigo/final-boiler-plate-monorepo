import BookingModel from '../models/BookingModel'
import asyncHandler from 'express-async-handler'
// @desc get all bookings
// @route /
// @access public
export const getAllBookings = asyncHandler(async (req, res) => {
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
})

// @desc get booking by ID
// @route /:id
// @access public
export const getBookingById = asyncHandler(async (req, res) => {
	try {
		const bookingId = +req.params.id
		const booking = await BookingModel.findById(bookingId)
		if (booking) {
			res.json(booking)
		} else {
			res.status(404).json({
				error: `Booking with id ${bookingId} not found.`,
			})
		}
	} catch (error) {
		res.status(500).json({
			error: 'Something went wrong, please try again.',
		})
	}
})

// @desc add a new booking
// @route /add
// @access public
export const addBooking = asyncHandler(async (req, res) => {
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
})
