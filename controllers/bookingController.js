import BookingModel from '../models/BookingModel'
import { ShowTimeModel } from '../models/ShowtimeModel'
import { MovieModel } from '../models/MovieModel'
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
		const { userId, email, showtimeId, seat } = req.body
		if (!email || !showtimeId || !seat)
			return res
				.status(400)
				.json({ error: 'Missing required information' })

		const showtimeDetails = await ShowTimeModel.find({ "_id": showtimeId })
		const movieTitle = showtimeDetails[0].movieTitle
		const price = showtimeDetails[0].price

		const movieDetails = await MovieModel.find({ "title": movieTitle })
		const movieId = movieDetails[0]._id

		const newBooking = new BookingModel({
			userId: userId,
			email: email,
			movieId: movieId,
			price: price,
			showtimeId: showtimeId,
			seat: seat
		})

		const saveBooking = await newBooking.save()
		const bookingId = saveBooking._id

		console.log(showtimeId, bookingId, seat)
		const bookSeat = await ShowTimeModel.findOneAndUpdate(
			{ 
				_id: showtimeId,
			},
			{ $set : {
				'seats.$[].$[xxx].booked' : true,
				'seats.$[].$[xxx].bookingID' : bookingId
			}},
			{arrayFilters: [
					{
						'xxx.seatIndex': seat[1]
					}
				]
			}
		)

		res.status(201).json({ booking: saveBooking, updatedShowTime: bookSeat})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
