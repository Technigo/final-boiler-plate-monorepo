import express from 'express';
import * as bookingController from '../controllers/bookingController';
import { authenticateUser } from '../middleware/authenticateUser';

const router = express.Router();


router.post('/', bookingController.createBooking);
router.get('/', authenticateUser, bookingController.getAllBookings);
router.delete('/deleteBooking/:id', authenticateUser, bookingController.deleteBookingById);
router.delete('/deleteAll', authenticateUser, bookingController.deleteAllBookings);
router.post('/:bookingId/handled', authenticateUser, bookingController.markBookingAsHandled);
router.get('/handledBookings', authenticateUser, bookingController.getHandledBookings);
router.get('/unhandledBookings', bookingController.getUnhandledBookings);

export default router;
