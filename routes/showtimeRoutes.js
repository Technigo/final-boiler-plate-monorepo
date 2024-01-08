import express from 'express'
const router = express.Router()
import {
	getAllShowtime,
	getShowtimeById,
	addShowtime,
	updateShowtime,
	seedShowtimes,
} from '../controllers/showtimeController'

router.route('/').get(getAllShowtime)
router.route('/:id').get(getShowtimeById)
router.route('/add').post(addShowtime)
router.route('/seed').put(seedShowtimes)
router.route('/update').put(updateShowtime)

export default router
