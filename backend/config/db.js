import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default db;


// In summary, this code does the following:

// - Imports the necessary libraries (mongoose and dotenv) for working with MongoDB and loading environment variables.
// - Loads environment variables from a .env file, which allows you to store configuration values separately from your code.
// - Defines an asynchronous function named connectDB that attempts to connect to a MongoDB database using the URL specified in the MONGO_URL environment variable.
// - If the connection is successful, it logs a message indicating that the MongoDB database is connected, including the host information.
// - If an error occurs during the connection attempt, it logs the error message and exits the Node.js process with an exit code of 1 to indicate that an error has occurred.
