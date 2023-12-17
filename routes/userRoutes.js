import express from 'express'
import {
	registerUserController,
	loginUserController,
} from '../controllers/userController'

const router = express.Router()

// REGISTER ROUTE: Handle user registration
router.post('/users/register', registerUserController)

// LOGIN ROUTE: Handle user login
router.post('/users/login', loginUserController)

export default router
