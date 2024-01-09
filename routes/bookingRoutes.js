import express from 'express'
const router = express.Router()

import {
	getAllBookings,
	getBookingById,
	addBooking,
} from '../controllers/bookingController'

import { authenticateUser } from '../middleware/authenticateUser'

router.route('/').get(getAllBookings).post(addBooking)
router.route('/:id').get(authenticateUser, getBookingById)

export default router
