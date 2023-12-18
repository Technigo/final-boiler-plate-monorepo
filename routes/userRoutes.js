import express from 'express'
const router = express.Router()
import {
	registerUserController,
	loginUserController,
} from '../controllers/userController'

router.post('/register', registerUserController)
router.post('/login', loginUserController)

export default router
