import express from 'express';
import * as newsletterController from '../controllers/newsletterController';
import { authenticateUser } from '../middleware/authenticateUser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


const router = express.Router();
// Subscribe route
router.post('/subscribe', newsletterController.subscribeToNewsletter);
// Get all subscribers route
router.get('/subscribers', authenticateUser, newsletterController.getAllSubscribers);
router.delete('/deleteNewsletter/:id', authenticateUser, newsletterController.deleteNewsletterById);

export default router;
