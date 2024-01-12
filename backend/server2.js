// Import necessary libraries and modules
import express from "express"; // Import the Express.js framework
import cors from "cors"; // Import the CORS middleware
import dotenv from "dotenv"; // Import dotenv for environment variables from a .env file
import mongoose from "mongoose"; // Import mongoose library to work with mongodb
import crypto from "crypto" // Imports the Node.js crypto library for generating secure ramdom strings.

// import user controller functions
// bcrypt: We use bcrypt to securely hash and store passwords in our database. Storing plain-text passwords is a security risk, as it exposes user credentials in case of a data breach. bcrypt helps us hash passwords in a way that is computationally expensive and time-consuming for potential attackers, making it difficult to crack passwords even if the database is compromised. It enhances the overall security of user authentication in our application.
import bcrypt from "bcrypt"
// asyncHandler: We use asyncHandler to simplify error handling in asynchronous code. It helps us avoid writing repetitive try-catch blocks by automatically catching errors and passing them to our error handling middleware. This makes our code cleaner and more readable, reducing the risk of unhandled exceptions that could crash the server. 
import asyncHandler from "express-async-handler"
// jwt (JSON Web Tokens): We use jwt for authentication and authorization. It allows us to create and verify tokens that contain user identity information, such as user IDs or roles. These tokens are often sent with requests to secure routes and verify that a user has the necessary permissions to access certain resources. JWTs are stateless and efficient, making them a popular choice for secure communication between the client and server.
// this one seems to be not used in this code, but ill have this here anyway
// import jwt from "jsonwebtoken"

dotenv.config(); // Load environment variables from the .env file
import taskRoutes from "./routes/taskRoutes"; // Import custom task controlled-routes
import userRoutes from "./routes/userRoutes"; // Import custom user routes

// import { connectDB } from "./config/db"; // Import database connection function (not used here)

// Import the Schema class from the Mongoose library
// Destructures the Schema class from the Mongoose library, allowing us to create a schema.
const { Schema } = mongoose

// Create a new Mongoose schema named 'userSchema'
// Creates a new Mongoose schema named userSchema that defines the structure of a user document in the MongoDB collection. It includes fields like username, password, and accessToken, specifying their data types, validation rules, and default values.
const userSchema = new Schema(
  {
    // Define the 'username' field with a String data type
    username: {
      type: String, // Specifies that 'username' should be a string
      required: true, // Indicates that 'username' is a required field
      unique: true, // Ensures that 'username' values are unique
      minlength: 2, // Sets a minimum length of 2 characters for 'username'
    },
    // Define the 'password' field with a String data type
    password: {
      type: String, // Specifies that 'password' should be a string
      required: true, // Indicates that 'password' is a required field
      minlength: 6, // Sets a minimum length of 6 characters for 'password
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Define the 'accessToken' field with a String data type
    accessToken: {
      type: String, // Specifies that 'accessToken' should be a string 
      default: () => crypto.randomBytes(128).toString("hex"), // Sets a default value using a cryptographic random string
    },
  },
  {
    timestamps: true,
  }
)

// // Create a Mongoose model named 'UserModel' based on the 'userSchema' for the 'users' collection
// // This model is used to interact with the "users" collection in the MongoDB database. It allows you to perform CRUD operations on user documents and provides methods for data validation based on the schema.
// export const UserModel = mongoose.model("User", userSchema) 

// In summary, this code defines a Mongoose schema (userSchema) that describes the structure of documents for users in a MongoDB collection. It also creates a Mongoose model (UserModel) associated with the "users" collection, which can be used to interact with the database and perform operations like creating, reading, updating, and deleting user documents.

// but im tired of 'users' collection. i had long hard times with this collection before. so ill use 'cats' instead in this case 
// no. im having err with this...
// yes. i cant use User anyway bcs ive used that with w16s project. so lets use Cat instead xD
const UserModel = mongoose.model('Cat', userSchema, 'cats')

// Define user controller function

// Actual Functions here

// -----------------------
// -----------------------

// @desc    Register new user
// @route   POST api/register
// @access  Public

const registerUserController = asyncHandler(async (req,res) => {
  // Extract email, username and password from the request body
  const { username, password, email } = req.body
  // In this try section of the try catch we will first do some conditional logic and then generate the newUser with a crypted password within the DB.
  try {
    // 1st Condition
    // Check whether all fields of registration logic are NOT [!email] inputted from the request.body object
    if (!username || !email || !password) {
      // if so, set http status to a 400 code
      res.status(400)
      // and throw new error with some info
      throw new Error("Please add all fields")
    }
    // 2nd Condition
    // Check if the current user trying to register is using a username or email that matches with the same username or email in the database, so they would have to choose something different
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    })
    if (existingUser) {
      res.status(400)
      throw new Error(
        `User with ${
          existingUser.username === username ? "username" : "email"
        } already exists`
      )
    }

    // Generate a salt and hash the user's password 
    // In this line below, we're using the bcrypt library to create a random value called "salt". The salt is added to the password before hashing it. It adds an extra layer of security by making it more difficult for attackers to use precomputed tables (rainbow tables) to crack passwords. The 10 in genSaltSync(10) represents the cost factor, which determines how computationally intensive the hashing process will be. 
    const salt = bcrypt.genSaltSync(10)
    
    // In this line below, we're using the generated salt to hash the user's password. Hashing transforms the password into a secure and irreversible string of characters. The bcrypt library handles the entire process for us, ensuring that the password is securely hashed. The resulting hashedPassword is what we store in the database to keep the user's password safe.
    const hashedPassword = bcrypt.hashSync(password, salt)
    // Create a new user instance with the hashed password 
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    })

    // Mongoose Method: newUser.save()
    // Description: Save the new user instance to the database
    await newUser.save()

    // Respond with a success message, user details, and the JWT token
    // but i dont see JWT token here... might need to generate additionally? idk
    res.status(201).json({
      success: true,
      response: {
        username: newUser.username,
        email: newUser.email,
        id: newUser._id,
        accessToken: newUser.accessToken,
      },
    })
  } catch (e) {
    // Handle any errors that occur during the registration process
    res.status(500).json({ success: false, response: e.message })
  }
})

// -----------------------
// -----------------------
// -----------------------
// -----------------------
// -----------------------

// @desc    Login Existing User
// @route   POST api/login
// @access  Public

const loginUserController = asyncHandler(async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body

  try {
    // Find a user with the provided username in the database
    const user = await UserModel.findOne({ username })
    if (!user) {
      // If no user is found with the provided username, respond with a 401 Unauthorized and a user not found message
      return res
        .status(401)
        .json({ success: false, response: "User not found" })
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      // If the provided password doesn't match the stored password, respond with a 401 Unauthorized and an incorrect password message
      return res
        .status(401)
        .json({ success: false, response: "Incorrect password" })
    }
    // Respond with a success message, user details, and the JWT token
    // not yet with JWT token. how to use that?
    res.status(200).json({
      success: true, 
      response: {
        username: user.username,
        id: user._id,
        accessToken: user.accessToken, // token for the user using the accessToken generated from the model, // Use the generated token here
      }
    })
  } catch (e) {
    // Handle any errors that occur during the login process
    res.status(500).json({ success: false, response: e.message })
  }
})

// SUMMARY

// This contains controller functions for user-related operations within an Express.js application. Let's provide a summary with additional context:

// registerUserController: This controller handles user registration. It extracts the user's username, password, and email from the request body. It performs several checks, such as ensuring that all required fields are provided and that the chosen username or email is not already in use by another user. It securely hashes the user's password using the bcrypt library and stores the hashed password in the database. After successfully registering the user, it responds with a success message, user details, and a accessToken, or potentially a JSON Web Token (JWT) for authentication.

// not having this here btw... 
// edited user's access token -> user's information such as userid or roles bcs i wasnt sure with this
// generateToken: This is a utility function used to generate JWT tokens for user authentication. It takes a user object and creates a token containing user's information such as userid or roles, with an optional secret key and a 24-hour expiration time

// loginUserController: This controller manages user login. It extracts the username and password from the request body, then attempts to find a user with the provided username in the database. If the user is found, it compares the provided password with the hashed password stored in the database using bcrypt. If the credentials match, it responds with a success message, user details, and the accessToken. (original document: 'If the credentials match, it generates a JWT token for the user and responds with a success message, user details, and the JWT token.' but i edited this bcs i dont have this future yet here) In case of authentication failure (wrong password or non-existent user), it responds with appropriate error messages. 

// In summary, this file provides controllers for user registration and login, ensuring that user credentials are securely handled and authenticated using accessTokens (original document: JWT tokens). It also uses bcrypt to hash and store passwords securely in the database, enhancing the overall security of user authentication in the application.

// after reading this, i strongly feel that i need to add JWT feature to make this secure?!?! but like... how??? or do i rly need to..? 

// Define user routes
// Create an instance of the Express router
const router = express.Router()
// REGISTER ROUTE: Handle user registration
router.post("/register", registerUserController) // When a POST request is made to /register, execute the registerUserController function
// LOGIN ROUTE: Handle user login
router.post("/login", loginUserController) // When a POST request is made to /login, execute the loginUserController function
// In summary, this code sets up routes using the Express router for user registration and login operations. It associates each route with the corresponding controller function. These routes define the API endpoints for handling user registration and login within the application. 

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT; // Set the port number for the server
const app = express(); // Create an instance of the Express application

// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Define an asynchronous function 'connectDB' to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URL from the environment variables
    // Mongoose Method: mongoose.connect()
    // Description: This line of code serves the crucial purpose of connecting the Node.js application to the MongoDB database specified by the URL provided in the environment variable MONGO_URL. Once this connection is established, the application can perform various database operations, such as querying and modifying data in the MongoDB database. It's a critical step in setting up the database connection for the application to work with MongoDB.
    const conn = await mongoose.connect(process.env.MONGO_URL)

    // If the connection is successful, log a message indicating that the MongoDB is connected
    console.log(`MongoDB Connected: ${conn.connection.host}`) 
  } catch (error) {
    // If an error occurs during the connection attempt, log the error message
    console.log(error)
    // Exit the Node.js process with an exit code of 1 to indicate an error
    process.exit(1)
  }
}

// middleware for user authentication
// Define a function called authenticateUser that takes a request (req), response (res), and a next function as parameters
const authenticateUser = async (req, res, next) => {
  // Retrieve the access token from the request header
  const accessToken = req.header("Authorization")
  try {
    // Find a user in the database using the retrieved access token
    // Mongoose Method: UserModel.findOne({ accessToken: accessToken })
    // Description: This line of code serves the purpose of authenticating a user based on the provided access token. It checks if a user with the specified accessToken exists in the database using the UserModel. If a user is found, their user document is stored in the user variable. This allows the middleware to add the user object to the request, making it available for subsequent middleware or routes. If no user is found, it prepares to send a 401 Unauthorized response to indicate that the user needs to log in. This code is an essential part of user authentication in the Node.js application and helps control access to protected routes or endpoints. 
    const user = await UserModel.findOne({ accessToken: accessToken })
    if (user) {
      // If a user is found, add the user object to the request object
      req.user = user // Add user to the request object 
      next() // Continue to the next middleware or route 
    } else {
      // If no user is found, send a 401 Unauthorized response
      res.status(401).json({ success: false, response: "Please log in" })
    }
  } catch (e) {
    // Handle any errors that occur during the database query or user authentication
    res.status(500).json({ success: false, response: e.message })
  }
}

// SUMMARY

//In this code, we have a function called authenticateUser that is used as middleware in a Node.js application. This middleware is responsible for checking the authorization header of an incoming request, searching for a user with the provided access token in the database using the UserModel, and adding the user object to the request if found. If no user is found or if there are any errors during the process, appropriate response are sent back to the client. In summary, this code is handling user authentication by checking the access token in the request header and verifying it against the database to grant access to protected routes or endpoints.

// // Use the routes for handling API requests
// // ROUTES - These routes USE controller functions ;)
// app.use(taskRoutes); // Use the task-controlled routes for task-related requests
// app.use(userRoutes); // Use the user-controlled routes for user-related requests

// Connection to the database through Mongoose
connectDB();

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Display a message when the server is successfully started
});
