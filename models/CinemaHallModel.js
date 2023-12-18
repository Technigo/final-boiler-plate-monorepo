import mongoose from 'mongoose'

const { Schema } = mongoose

const cinemaHallSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	capacity: {
		type: Number,
		required: true,
	},
	rows: {
		type: Array,
		required: true,
	},
})

export const CinemaHallModel = mongoose.model('CinemaHall', cinemaHallSchema)
export default CinemaHallModel
