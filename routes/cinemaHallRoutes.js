import express from 'express'
import CinemaHallModel from '../models/CinemaHallModel'

const cinemaHallRouter = express.Router()

cinemaHallRouter.get('/cinema-halls', async (req, res) => {
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

cinemaHallRouter.get('/cinema-halls/:id', async (req, res) => {
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

cinemaHallRouter.post('/cinema-halls/add', async (req, res) => {
	try {
		const { name, capacity, rows } = req.body
		if (!name || !capacity || !rows)
			return res.status(400).json({ error: 'Missing required information' })

		const newCinemaHall = new CinemaHallModel({
			name: name,
			capacity: capacity,
			rows: rows,
		})
		const saveCinemaHall = await newCinemaHall.save()
		res.status(201).json(saveCinemaHall)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

export default cinemaHallRouter
