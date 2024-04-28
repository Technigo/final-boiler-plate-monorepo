import express from 'express';
import * as createBookingController from '../controllers/createBookingController';
import * as deleteBookingController from '../controllers/deleteBookingController';
import * as getAllBookingsController from '../controllers/getAllBookingsController';
import * as getHandledBookingsController from '../controllers/getHandledBookingsController';
import * as getUnhandledBookingsController from '../controllers/getUnhandledBookingsController';
import * as markAsHandledBookingController from '../controllers/markashandledBookingController';
import { authenticateUser } from '../middleware/authenticateUser';
const { handleDisableDate } = require('../controllers/handleDisableDateController');

const router = express.Router();

router.post('/', createBookingController.createBooking);
router.get('/', authenticateUser, getAllBookingsController.getAllBookings);
router.post('/:bookingId/handled', authenticateUser, markAsHandledBookingController.markBookingAsHandled);
router.get('/handledBookings', getHandledBookingsController.getHandledBookings);
router.get('/unhandledBookings', authenticateUser, getUnhandledBookingsController.getUnhandledBookings);
router.get('/handledBookings/bookingsByDate', authenticateUser, getHandledBookingsController.getHandledBookingsByDate);
router.delete('/deleteBooking/:id', authenticateUser, deleteBookingController.deleteBookingById);
router.delete('/deleteAll', authenticateUser, deleteBookingController.deleteAllBookings);

// Route for handling disabling date
router.put('/:bookingId/disableDate', handleDisableDate); // Updated usage

export default router;
