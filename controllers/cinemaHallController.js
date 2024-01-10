import CinemaHallModel from '../models/CinemaHallModel'
import asyncHandler from 'express-async-handler'

// @desc get all cinemaHall
// @route /
// @access public
export const getAllCinemaHall = asyncHandler(async (req, res) => {
	try {
		const cinemaHalls = await CinemaHallModel.find()
		if (cinemaHalls.length > 0) {
			res.json(cinemaHalls)
		} else {
			res.status(404).json({ error: 'No cinema halls found' })
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// @desc get cinemaHall by ID
// @route /:id
// @access public
export const getCinemaHallById = asyncHandler(async (req, res) => {
	try {
		const cinemaHallsId = parseInt.req.params.id
		const cinemaHall = await CinemaHallModel.findById(cinemaHallsId)
		if (cinemaHall) {
			res.status(302).json(cinemaHall)
		} else {
			res.status(404).json({ error: `Cinema hall with id ${cinemaHallsId} not found.` })
		}
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong, please try again.' })
	}
})

// @desc  add a new cinemaHall
// @route /add
// @access public
export const addCinemaHall = asyncHandler(async (req, res) => {
	try {
		const { name, capacity, rowsThenSeats } = req.body
		if (!name || !capacity || !rowsThenSeats)
			return res.status(400).json({ error: 'Missing required information' })

		const newCinemaHall = new CinemaHallModel({
			name: name,
			capacity: capacity,
			rowsThenSeats: rowsThenSeats,
		})
		const saveCinemaHall = await newCinemaHall.save()
		res.status(201).json(saveCinemaHall)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
