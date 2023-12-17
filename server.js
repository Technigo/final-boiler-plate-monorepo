import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

// Defines the port the app will run on. Defaults to 8080
const port = process.env.PORT || 8080
const app = express()
const listEndpoints = require('express-list-endpoints')

//Importing the routes
import userRoutes from './routes/userRoutes'
import bookingRoutes from './routes/bookingRoutes'
import movieRoutes from './routes/MovieRoutes'
import cinemaHallRoutes from './routes/cinemaHallRoutes';
import showtimeRoutes from './routes/showtimeRoutes';


// Add middlewares to enable cors and json body parsing
app.use(cors()); // CORS = Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming data in JSON-format
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data using the querystring library. Parses simple objects and arrays

// ROUTES - These routes USE controller functions ;)
// app.use('/', userRoutes) // Use the user-controlled routes for user-related requests
app.use('/', bookingRoutes);
app.use('/', cinemaHallRoutes);
app.use('/', showtimeRoutes);
app.use('/movies', movieRoutes)

// This asynchronous function connects to the MongoDB database. It uses the MONGO_URL (connection url) stored in the .env-file.
const connectDB = async () => {
	try {
		const connected = await mongoose.connect(process.env.MONGO_URL)

		console.log(`Mongo DB Connected: ${connected.connection.host}`)
	} catch (error) {
		console.log(error)

		process.exit(1) // Exit the Node.js process. Send exit code 1 which indicates an error
	}
}
connectDB()

app.get('/', (req, res) => {
	res.send(listEndpoints(app))
})

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`)
})
