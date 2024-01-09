import mongoose from 'mongoose'

const { Schema } = mongoose

const bookingSchema = new Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		// required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
		  validator: function (value) {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
		  },
		  message: 'Invalid email address format',
		},
	  },
	movieId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Movie',
		required: true,
	},
	bookingDate: {
		type: Date,
		default: Date.now,
	},
	showtimeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ShowTime',
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	seat: {
		type: Array,
		required: true,
	}
})

export const BookingModel = mongoose.model('Booking', bookingSchema)
export default BookingModel
