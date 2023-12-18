import express from 'express'
const router = express.Router()
import {
	getAllShowtime,
	getShowtimeById,
	addShowtime,
	updateShowtime,
} from '../controllers/showtimeController'

router.route('/').get(getAllShowtime)
router.route('/:id').get(getShowtimeById)
router.route('/add').post(addShowtime)
router.route('/update').put(updateShowtime)

export default router
