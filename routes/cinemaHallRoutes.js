import express from 'express'
import {
	getAllCinemaHall,
	getCinemaHallById,
	addCinemaHall,
} from '../controllers/cinemaHallController'

const router = express.Router()

router.route('/').get(getAllCinemaHall)

router.route('/:id').get(getCinemaHallById)

router.route('/add').post(addCinemaHall)

export default router
