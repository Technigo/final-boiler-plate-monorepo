import mongoose from 'mongoose'

const { Schema } = mongoose

const movieSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	director: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	genre: {
		type: Array,
		required: true,
	},
	releaseDate: {
		type: Date,
		required: true,
	},
	posterUrl: {
		type: String,
		required: true,
	},
	backdropUrl: {
		type: String,
	},
	rating: {
		type: Number,
		default: 0,
	},
	IMDBRating: {
		type: Number,
	},
})

export const MovieModel = mongoose.model('Movie', movieSchema)
export default MovieModel
