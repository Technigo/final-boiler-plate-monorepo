import express from 'express'
const router = express.Router()
import {
	getAllBookings,
	getBookingById,
	addBooking,
} from '../controllers/bookingController'
import { authenticateUser } from '../middleware/authenticateUser'

router.route('/').get(getAllBookings)
router.route('/:id').get(authenticateUser, getBookingById)
router.route('/add').post(authenticateUser, addBooking)

export default router
