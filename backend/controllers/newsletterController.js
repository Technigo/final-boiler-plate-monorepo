import { Resend } from 'resend';

import NewsLetter from '../models/NewsLetterModel';
import { handleErrors } from './commonController';
require('dotenv').config();


const resend = new Resend(process.env.NEWSLETTER_RESEND_API_KEY);

// Subscribe to newsletter

export const subscribeToNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email already exists in the newsletters collection
        const existingSubscriber = await NewsLetter.findOne({ email });

        if (existingSubscriber) {
            res.status(400).json({ message: 'Email already exists' });
        } else {
            // Create a new subscriber using the request body
            const newSubscriber = new NewsLetter({ email });

            // Save the new subscriber to the database
            await newSubscriber.save();

            // Send a welcome/confirmation email to the subscriber
            const subject = 'Welcome to Tuanis Surf School Newsletter';
            const htmlContent = '<p>Thank you for subscribing to our newsletter. We are thrilled to have you join our community! Get ready for a wave of exciting updates, surf tips, and exclusive offers. What to expect from our newsletter: Monthly surf reports and forecasts, exclusive discounts on surf lessons and gear, tips and tricks for improving your surf skills, and updates on upcoming events and surf camps. Feel free to reach out if you have any questions or if there is anything specific you would like to see in our newsletters. Get ready to ride the waves with Tuanis Surf School!</p>'
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject,
                html: htmlContent,
            });

            // Respond with a success message
            res.status(201).json({ message: 'Subscriber added successfully' });
        }
    } catch (error) {
        // Handle errors and send an appropriate response
        handleErrors(res, error);
    }
};

// Get all subscribers
export const getAllSubscribers = async (req, res) => {
    try {
        // Fetch all subscribers from the database
        const subscribers = await NewsLetter.find();

        // Respond with the list of subscribers
        res.status(200).json(subscribers);
    } catch (error) {
        // Handle errors and send an appropriate response
        handleErrors(res, error);
    }
};

// Delete a specific newsletter by ID
export const deleteNewsletterById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the newsletter with the specified ID
        const deletedNewsletter = await NewsLetter.findByIdAndDelete(id);

        if (deletedNewsletter) {
            // Respond with a success message and the deleted newsletter
            res.json({
                message: 'Newsletter deleted successfully',
                deletedNewsletter,
            });
        } else {
            // Respond with a 404 status if the newsletter is not found
            res.status(404).json({ message: 'Newsletter not found' });
        }
    } catch (error) {
        // Handle errors and send an appropriate response
        handleErrors(res, error);
    }
};