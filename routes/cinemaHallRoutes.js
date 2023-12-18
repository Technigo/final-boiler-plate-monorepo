import express from 'express'
const router = express.Router()
import {
	getAllCinemaHall,
	getCinemaHallById,
	addCinemaHall,
} from '../controllers/cinemaHallController'

router.route('/').get(getAllCinemaHall)
router.route('/:id').get(getCinemaHallById)
router.route('/add').post(addCinemaHall)

export default router
