import ShowtimeModel, { ShowTimeModel } from '../models/ShowtimeModel'
import asyncHandler from 'express-async-handler'

import data from '../json-files/showTime.json'

// @desc get  all showtimes
// @route /
// @access public
export const getAllShowtime = asyncHandler(async (req, res) => {
	
	await ShowTimeModel.deleteMany({})
	
	data.forEach(showtime => {
		new ShowTimeModel(showtime).save()
	})
	
	try {
		const showTimes = await ShowtimeModel.find()
		if (showTimes.length > 0) {
			res.json(showTimes)
		} else {
			res.status(404).json({ error: 'No showtime found' })
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// @desc get showtime by ID
// @route /:id
// @access public
export const getShowtimeById = asyncHandler(async (req, res) => {
	try {
		const showtimeId = +req.params.id
		const showtime = await ShowtimeModel.findById(showtimeId)
		if (showtime) {
			res.json(showtime)
		} else {
			res.status(404).json({ error: `Showtime with id ${showtimeId} not found.` })
		}
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong, please try again.' })
	}
})

// @desc add  a new showtime
// @route /add
// @access public
export const addShowtime = asyncHandler(async (req, res) => {
	try {
		const { movieTitle, cinemaHall, date, startingTime, endTime, price, seat } = req.body

		// Check for missing required information
		if (!movieTitle || !cinemaHall || !date || !startingTime || !endTime || !price || !seat)
			return res.status(400).json({ error: 'Missing required information' })

		// Transform startingTime and endTime from strings to Date objects
		const startTimeParts = startingTime.split(':').map(Number)
		const endTimeParts = endTime.split(':').map(Number)

		// Create Date objects for startingTime and endTime
		const startDateTime = new Date(date)
		startDateTime.setHours(startTimeParts[0], startTimeParts[1], 0, 0)

		const endDateTime = new Date(date)
		endDateTime.setHours(endTimeParts[0], endTimeParts[1], 0, 0)

		const newShowtime = new ShowtimeModel({
			movieTitle: movieTitle,
			cinemaHall: cinemaHall,
			date: date,
			startingTime: startDateTime,
			endTime: endDateTime,
			price: price,
			seat: seat,
		})
		const saveShowtime = await newShowtime.save()

		res.status(201).json(saveShowtime)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// @desc update Showtime
// @route /update
// @access public
export const updateShowtime = asyncHandler(async (req, res) => {
	try {
		// Extract the showtime ID from the request parameters
		const showtimeId = req.params.id

		// Check if the showtime exists in the database
		const existingShowtime = await ShowTimeModel.findById(showtimeId)
		if (!existingShowtime) {
			// If not found, return a 404 error
			return res.status(404).json({ error: `ShowTime with id ${showtimeId} not found.` })
		}

		// Extract data from the PUT request body
		const { movieTitle, cinemaHall, date, startingTime, endTime, price, seat } = req.body

		// Update the showtime data
		existingShowtime.movieTitle = movieTitle
		existingShowtime.cinemaHall = cinemaHall
		existingShowtime.date = date
		existingShowtime.startingTime = startingTime
		existingShowtime.endTime = endTime
		existingShowtime.price = price
		existingShowtime.seat = seat

		// Save the updated showtime to the database
		const updatedShowtime = await existingShowtime.save()

		// Respond with the updated showtime
		res.status(202).json(updatedShowtime)
	} catch (error) {
		// Handle errors that occurred during the request processing
		res.status(500).json({ error: 'Something went wrong, please try again.' })
	}
})
