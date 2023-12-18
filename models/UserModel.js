import mongoose from 'mongoose'
import crypto from 'crypto'

const { Schema } = mongoose

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 2,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString('hex'),
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
})

export const UserModel = mongoose.model('User', userSchema)
export default UserModel
