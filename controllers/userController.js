import { UserModel } from '../models/UserModel'

//asyncHandler: simplifies error handling in asynchronous code. We don't need try-catch blocks as asyncHandler automatically catches the errors and pass them to the error handling middleware.
import asyncHandler from 'express-async-handler'

// bcrypt: to hash and store passwords. Hashed passwords are computationally expensive and time-consuming for potential attackers. It increases the security of user authentication in our application.
import bcrypt from 'bcrypt'

// jwt (JSON Web Tokens): for authentication and authorization. It allows us to create and verify tokens that contain user identity information, such as user IDs or roles. These tokens are often sent with requests to secure routes and verify that a user has the necessary permissions to access certain resources. JWTs are stateless and efficient, making them a popular choice for secure communication between the client and server.
import jwt from 'jsonwebtoken'

//SHOULD WE ADD THESE??
// generateToken: This is a utility function used to generate JWT tokens for user authentication. It takes a user object and creates a token containing the user's access token, with an optional secret key and a 24-hour expiration time.

// In summary, this file provides controllers for user registration and login, ensuring that user credentials are securely handled and authenticated using JWT tokens. It also uses bcrypt to hash and store passwords securely in the database, enhancing the overall security of user authentication in the application.
//SHOULD WE??

// // @desc    Register new user
// // @route   POST api/register
// // @access  Public

// registerUserController: This controller handles user registration. It extracts the user's username, password, and email from the request body. It performs several checks, such as ensuring that all required fields are provided and that the chosen username or email is not already in use by another user. It securely hashes the user's password using the bcrypt library and stores the hashed password in the database. After successfully registering the user, it responds with a success message, user details, and a JSON Web Token (JWT) for authentication.
export const registerUserController = asyncHandler(async (req, res) => {
	const { username, password, email } = req.body

	try {
		if (!username || !email || !password) {
			res.status(400).json({ message: `All fields required` })
			throw new Error('Please add all fields')
		}

		const existingUser = await UserModel.findOne({
			$or: [{ username }, { email }],
		})

		if (existingUser) {
			res.status(400).json({
				message: `The username or email is already in use`,
			})
			throw new Error(
				`User with ${
					existingUser.username === username ? 'username' : 'email'
				} already exists`
			)
		}

		// Generate a salt and hash the user's password
		const salt = bcrypt.genSaltSync(10)
		const hashedPassword = bcrypt.hashSync(password, salt)

		// Create a new user with the hashed password
		const newUser = new UserModel({
			username,
			email,
			password: hashedPassword,
		})
		await newUser.save()

		// Respond with a success message, user details, and the JWT token
		res.status(201).json({
			success: true,
			response: {
				username: newUser.username,
				email: newUser.email,
				id: newUser._id,
				accessToken: newUser.accessToken,
			},
		})
	} catch (error) {
		res.status(500).json({ success: false, response: error.message })
	}
})

// // @desc    Login Existing User
// // @route   POST api/login
// // @access  Public

// loginUserController: This controller manages user login. It extracts the username and password from the request body, then attempts to find a user with the provided username in the database. If the user is found, it compares the provided password with the hashed password stored in the database using bcrypt. If the credentials match, it generates a JWT token for the user and responds with a success message, user details, and the JWT token. In case of authentication failure (wrong password or non-existent user), it responds with appropriate error messages.
export const loginUserController = asyncHandler(async (req, res) => {
	const { username, password } = req.body

	try {
		const user = await UserModel.findOne({ username })

		if (!user) {
			return res
				.status(401)
				.json({ success: false, response: 'User not found' })
		}

		// Compare the provided password with the hashed password in the database
		const isMatch = await bcrypt.compare(password, user.password)

		if (!isMatch) {
			return res
				.status(401)
				.json({ success: false, response: 'Incorrect password' })
		}

		res.status(200).json({
			success: true,
			response: {
				username: user.username,
				id: user._id,
				accessToken: user.accessToken,
			},
		})
	} catch (error) {
		res.status(500).json({ success: false, response: error.message })
	}
})
