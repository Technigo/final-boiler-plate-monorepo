import { ShowTimeModel } from '../models/ShowtimeModel'
import { CinemaHallModel } from '../models/CinemaHallModel'
import { MovieModel } from '../models/MovieModel'
import asyncHandler from 'express-async-handler'

import data from '../json-files/showTime.json'

// @desc get  all showtimes
// @route /
// @access public
export const getAllShowtime = asyncHandler(async (req, res) => {
	try {
		const showTimes = await ShowTimeModel.find()
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
		const showtimeId = req.params.id
		const showtime = await ShowTimeModel.findById(showtimeId)
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
		const { movieId, cinemaHall, date, startingTime, duration, price } = req.body
		
		// Check for missing required information
		if (!movieId || !cinemaHall || !date || !startingTime || !duration || !price) return res.status(400).json({ error: 'Missing required information' })
	
		// Transform startingTime and endTime from strings to Date objects
		// const startTimeParts = startingTime.split(':').map(Number)
		// const endTimeParts = endTime.split(':').map(Number)
		
		// Create Date objects for startingTime and endTime
		// const startDateTime = new Date(date)
		// startDateTime.setHours(startTimeParts[0], startTimeParts[1], 0, 0)
		
		// const endDateTime = new Date(date)
		// endDateTime.setHours(endTimeParts[0], endTimeParts[1], 0, 0)

		const movieDetails = await MovieModel.find(
			{ "_id": movieId }
		)
		if (!movieDetails) {
			return res.status(404).json({ error: 'Movie not found' });
		} else {
			const movieTitle = movieDetails[0].title
		}
		
		const hallDetails = await CinemaHallModel.find(
			{ "name": cinemaHall }, 
			{ "rowsThenSeats": 1, "_id": 0 }
		)
		if (!hallDetails) {
			return res.status(404).json({ error: 'The cinemahall is not found' });
		} else {
			const [ numRows, numSeats ] = hallDetails[0].rowsThenSeats
		}

		const seats = []
		for (let i = 0; i < numRows; i++) {
			const row = []
			for (let j=0; j < numSeats; j++) {
				let seatIndex = (numSeats*i) + j
				row.push({ booked: false, selected: false, bookingID: null, rowIndex: i + 1, seatIndex: seatIndex + 1 })
			}
			seats.push(row)
		}
		
		const newShowtime = new ShowTimeModel({
			movieTitle: movieTitle,
			cinemaHall: cinemaHall,
			date: date,
			// startingTime: startDateTime,
			startingTime: startingTime,
			duration: duration,
			price: price,
			seats: seats,
		})
		const saveShowtime = await newShowtime.save()
		
		res.status(201).json(saveShowtime)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// @desc update booked-element in seats in the Showtime
// @route /showtime/:id
// @access public
export const bookSeats = asyncHandler(async (req, res) => {
	try {
		const { seat, id } = req.body

		const existingShowtime = await ShowTimeModel.findById(id)

		if (!existingShowtime) {
			return res.status(404).json({error: `Cannot find the showtime with id ${showTimeId}`})
		}

		let seatToUpdate = null
		let selectedValue

		existingShowtime.seats.forEach((rowArray) => {
			rowArray.forEach((seatObject) => {
				if (seatObject.seatIndex === seat[1]) {
					seatToUpdate = seatObject

					if (seatToUpdate.selected === false) {
						selectedValue = true
					} else {
						selectedValue = false
					}
				}
			})
		})

		if (!seatToUpdate) {
			return res.status(404).json({error: `Cannot find the seat with index ${seat[1]}`})
		}
		if (seatToUpdate.booked) {
			return res.status(400).json({error: `The seat with index ${seat[1]} is already booked`})
		}

		try {
			const updatedShowTime = await ShowTimeModel.findOneAndUpdate(
				{ _id: existingShowtime._id },
				{ $set: { 'seats.$[].$[xxx].selected': selectedValue } },
				{ 
					arrayFilters: [
						{ 'xxx.seatIndex': seatToUpdate.seatIndex}
					],
					returnOriginal: false
				}
			)
			res.status(200).json(updatedShowTime)
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Error updating the showtime.' });
		}

	} catch (error) {
		res.status(500).json({ error: 'Something went wrong, please try again.' })
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
		existingShowtime.seats = seat
		
		// Save the updated showtime to the database
		const updatedShowtime = await existingShowtime.save()
		
		// Respond with the updated showtime
		res.status(202).json(updatedShowtime)
	} catch (error) {
		// Handle errors that occurred during the request processing
		res.status(500).json({ error: 'Something went wrong, please try again.' })
	}
})

export const getShowtimeByMovie = asyncHandler(async (req, res) => {
	try {
		const movieId = req.params.movieId
		const movieDetails = await MovieModel.findById(movieId)

		const showtime = await ShowTimeModel.find({movieTitle: movieDetails.title})
		if (showtime) {
			res.json(showtime)
		} else {
			res.status(404).json({ error: `Showtime with movieId ${movieId} not found.` })
		}
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong, please try again.' })
	}
})

// @desc seed showtimes from json-file
// @route /seedshowtime
// @access public
export const seedShowtimes = asyncHandler(async (req, res) => {
	await ShowTimeModel.deleteMany({})
	
	data.forEach(showtime => {
		new ShowTimeModel(showtime).save()
	})

	res.json({status: 'success', message: 'Database of showtime seeded'})
})