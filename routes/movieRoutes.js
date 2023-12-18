import express from 'express'
const router = express.Router()
import {
	getComingMovies,
	getMovies,
	getMovie,
	postMovie,
} from '../controllers/movieController'
import { authenticateUser } from '../middleware/authenticateUser'

router.route('/').get(authenticateUser, getMovies).post(postMovie)
router.route('/:movieID').get(getMovie)
router.route('/coming').get(getComingMovies)

export default router
