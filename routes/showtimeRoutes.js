import express from 'express'
const router = express.Router()
import {
	getAllShowtime,
	getShowtimeById,
	addShowtime,
	updateShowtime,
	seedShowtimes,
	getShowtimeByMovie,
	bookSeats,
} from '../controllers/showtimeController'

router.route('/').get(getAllShowtime)
router.route('/showtime/:id').get(getShowtimeById).put(bookSeats)
router.route('/add').post(addShowtime)
router.route('/seed').get(seedShowtimes)
router.route('/movie/:movieId').get(getShowtimeByMovie)
router.route('/showtime/:id/update').put(updateShowtime)

export default router
