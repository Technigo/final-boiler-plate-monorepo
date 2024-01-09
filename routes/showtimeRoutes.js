import express from 'express'
const router = express.Router()
import {
	getAllShowtime,
	getShowtimeById,
	addShowtime,
	updateShowtime,
	seedShowtimes,
	bookSeats,
} from '../controllers/showtimeController'

router.route('/').get(getAllShowtime)
router.route('/showtime/:id').get(getShowtimeById).put(bookSeats)
router.route('/add').post(addShowtime)
router.route('/seed').get(seedShowtimes)
router.route('/shotime/:id/update').put(updateShowtime)

export default router
