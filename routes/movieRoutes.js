import express from 'express'
const router = express.Router()
import {
	getComingMovies,
	getMovies,
	getMovie,
	postMovie,
} from '../controllers/movieController'
import 'dotenv/config'

router.route('/').get(getMovies).post(postMovie)
router.route('/:movieID').get(getMovie)
router.route('/coming').get(getComingMovies)

export default router
