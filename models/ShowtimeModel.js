import mongoose from 'mongoose'

const { Schema } = mongoose

const ShowtimeSchema = new Schema({
	movieTitle: {
		type: String,
		required: true,
	},
	moviePoster: {
		type: String,
		required: true,
	},
	cinemaHall: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	startingTime: {
		type: Number,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	seats: {
		type: Array,
		required: true,
	},
})

export const ShowTimeModel = mongoose.model('ShowTime', ShowtimeSchema)
export default ShowTimeModel
