import { AdminModel } from '../models/AdminModel';
import { connectDB } from '../config/db'; // Import the connectDB function from your backend code
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from the .env file

// Implement authentication and authorization checks within the script. Only authorized individuals (developers or administrators) should be able to execute the script.

connectDB(); // Ensure the database connection is established
const port = process.env.PORT || 3000; // Use the PORT environment variable from .env or default to 3000

const authToken = process.env.AUTH_TOKEN; // Get the token from the environment variable

// Check if the script is executed with the correct authorization token
if (!isAuthorized(authToken)) {
    console.error('Unauthorized: You do not have permission to execute this script.');
    process.exit(1); // Exit the script with an error code
}

// SCRIPT //
// Create admin user records
const admin1 = new AdminModel({
    username: 'Mirela Cacan',
    email: 'mirelacacan@gmail.com',
    password: 'password123',
});

const admin2 = new AdminModel({
    username: 'Elba Cacan',
    email: 'elbacacan@gmail.com',
    password: 'password456',
});

// Save admin users to the database
admin1.save();
admin2.save();

// When you need to add or update admin users, you can run this script or module. It will insert or update the admin user records in your database. To run it, use the node command followed by the script's file name, e.g., `node addAdmin.js`.