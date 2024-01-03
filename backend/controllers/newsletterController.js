import NewsLetter from '../models/NewsLetterModel';
import { handleErrors } from './commonController';

// Subscribe to newsletter
export const subscribeToNewsletter = async (req, res) => {
    try {
        // Create a new subscriber using the request body
        const newSubscriber = new NewsLetter(req.body);

        // Save the new subscriber to the database
        await newSubscriber.save();

        // Respond with a success message
        res.status(201).json({ message: 'Subscriber added successfully' });
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